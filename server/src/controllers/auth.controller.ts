import { NextFunction, Request, Response } from "express";
import userModel, { IUser } from "../models/users.model";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Document, ObjectId, Types } from "mongoose";
import { OAuth2Client } from "google-auth-library";

const client = new OAuth2Client();
const googleSignIn = async (req: Request, res: Response) => {
  try {
    const ticket = await client.verifyIdToken({
      idToken: req.body.credential,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    const payload = ticket.getPayload();
    const email = payload?.email;
    if (email) {
      let user = await userModel.findOne({ email: email });
      if (!user) {
        user = await userModel.create({
          email: email,
          username: payload?.name,
          avatar: payload.picture,
          password: "google-login",
        });
      }
      const tokens = generateToken(user._id);
      if (!tokens) {
        return res.status(500).send("Server Error");
      }
      return res.status(200).send({
        email: user.email,
        _id: user._id,
        avatar: user.avatar,
        username: user.username,
        ...tokens,
      });
    }
  } catch (err) {
    res.status(400).send(err);
  }
};

const register = async (req: Request, res: Response) => {
  try {
    const userByEmail = await userModel.findOne({ email: req.body.email });
    if (userByEmail) {
      return res.status(500).send("Email already exist");
    }

    const password = req.body.password;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = await userModel.create({
      avatar: req.body.avatar,
      email: req.body.email,
      password: hashedPassword,
      username: req.body.username,
    });
    const tokens = generateToken(user._id);
    if (!tokens) {
      return res.status(500).send("Server Error");
    }

    user.refreshToken = [tokens.refreshToken];
    await user.save();

    res.status(200).send({
      username: user.username,
      avatar: user.avatar,
      email: user.email,
      refreshToken: tokens.refreshToken,
      _id: user._id,
    });
  } catch (error) {
    res.status(400).send(error);
  }
};

type tTokens = {
  accessToken: string;
  refreshToken: string;
};

const generateToken = (userId: Types.ObjectId): tTokens | null => {
  if (!process.env.TOKEN_SECRET) {
    return null;
  }

  const random = Math.random().toString();

  const accessToken = jwt.sign(
    {
      _id: userId,
      random: random,
    },
    process.env.TOKEN_SECRET,
    { expiresIn: process.env.TOKEN_EXPIRES }
  );
  const refreshToken = jwt.sign(
    {
      _id: userId,
      random: random,
    },
    process.env.TOKEN_SECRET,
    { expiresIn: process.env.REFRESH_TOKEN_EXPIRES }
  );

  return {
    accessToken: accessToken,
    refreshToken: refreshToken,
  };
};

const login = async (req: Request, res: Response) => {
  try {
    const user = await userModel.findOne({ email: req.body.email });
    if (!user) {
      res.status(400).send("wrong username or password");
      return;
    }

    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!validPassword) {
      res.status(400).send("wrong username or password");
      return;
    }
    if (!process.env.TOKEN_SECRET) {
      res.status(500).send("Server Error");
      return;
    }

    const tokens = generateToken(user._id);
    if (!tokens) {
      res.status(500).send("Server Error");
      return;
    }
    if (!user.refreshToken) {
      user.refreshToken = [];
    }
    user.refreshToken.push(tokens.refreshToken);
    await user.save();
    res.status(200).send({
      username: user.username,
      avatar: user.avatar,
      email: user.email,
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken,
      _id: user._id,
    });
  } catch (err) {
    res.status(400).send(err);
  }
};

type tUser = Document<unknown, {}, IUser> &
  IUser &
  Required<{
    _id: Types.ObjectId;
  }> & {
    __v: number;
  };

const verifyRefreshToken = (refreshToken: string | undefined) => {
  return new Promise<tUser>((resolve, reject) => {
    if (!refreshToken) {
      reject("fail");
      return;
    }

    if (!process.env.TOKEN_SECRET) {
      reject("fail");
      return;
    }
    jwt.verify(
      refreshToken,
      process.env.TOKEN_SECRET,
      async (err: any, payload: any) => {
        if (err) {
          reject("fail");
          return;
        }

        const userId = payload._id;
        try {
          const user = await userModel.findById(userId);
          if (!user) {
            reject("fail");
            return;
          }
          if (!user.refreshToken || !user.refreshToken.includes(refreshToken)) {
            user.refreshToken = [];
            await user.save();
            reject("fail");
            return;
          }
          const tokens = user.refreshToken!.filter(
            (token) => token !== refreshToken
          );
          user.refreshToken = tokens;

          resolve(user);
        } catch (err) {
          reject("fail");
          return;
        }
      }
    );
  });
};

const logout = async (req: Request, res: Response) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    jwt.verify(
      token,
      process.env.TOKEN_SECRET as string,
      async (err: jwt.VerifyErrors | null, userInfo: any) => {
        if (err) {
          return res.status(403).json({ message: "Forbidden" });
        }

        const userId = userInfo?._id;
        if (!userId) {
          return res.status(404).json({ message: "User not found" });
        }

        const user = await userModel.findById(userId);
        if (!user) {
          return res.status(404).json({ message: "User not found" });
        }

        user.refreshToken = [];
        await user.save();
        return res.status(200).json({ message: "User logged out" });
      }
    );
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error logging out user" });
  }
};

const refresh = async (req: Request, res: Response) => {
  try {
    const user = await verifyRefreshToken(req.body.refreshToken);
    if (!user) {
      res.status(400).send("fail");
      return;
    }

    const tokens = generateToken(user._id);
    if (!tokens) {
      res.status(500).send("Server Error");
      return;
    }
    if (!user.refreshToken) {
      user.refreshToken = [];
    }
    user.refreshToken.push(tokens.refreshToken);

    await user.save();
    res.status(200).send({
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken,
      _id: user._id,
    });
  } catch (err) {
    res.status(400).send("fail");
  }
};

type Payload = {
  _id: string;
};

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authorization = req.header("authorization");
  const token = authorization && authorization.split(" ")[1];

  if (!token) {
    res.status(401).send("Access Denied");
    return;
  }
  if (!process.env.TOKEN_SECRET) {
    res.status(500).send("Server Error");
    return;
  }

  jwt.verify(token, process.env.TOKEN_SECRET, (err, payload) => {
    if (err) {
      res.status(401).send("Access Denied");
      return;
    }
    req.params.userId = (payload as Payload)._id;
    next();
  });
};

export const updateUser = async (req: Request, res: Response) => {
  const id = req.params.id;
  const newUsername = req.body.username;
  const newAvatar = req.body.avatar;

  try {
    const rs = await userModel.findByIdAndUpdate(id, {
      username: newUsername,
      avatar: newAvatar,
    });
    res.status(200).send("updated");
  } catch (error) {
    res.status(400).send(error);
  }
};

export default { googleSignIn, register, login, refresh, logout, updateUser };
