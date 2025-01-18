"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
const users_model_1 = __importDefault(require("../models/users.model"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
//DONE
const register = async (req, res) => {
    try {
        const password = req.body.password;
        const salt = await bcrypt_1.default.genSalt(10);
        const hashedPassword = await bcrypt_1.default.hash(password, salt);
        const user = await users_model_1.default.create({
            email: req.body.email,
            password: hashedPassword,
        });
        res.status(200).send(user);
    }
    catch (error) {
        res.status(400).send(error);
    }
};
//DONE
const generateToken = (userId) => {
    if (!process.env.TOKEN_SECRET) {
        return null;
    }
    const random = Math.random().toString();
    const accessToken = jsonwebtoken_1.default.sign({
        _id: userId,
        random: random,
    }, process.env.TOKEN_SECRET, { expiresIn: process.env.TOKEN_EXPIRES });
    const refreshToken = jsonwebtoken_1.default.sign({
        _id: userId,
        random: random,
    }, process.env.TOKEN_SECRET, { expiresIn: process.env.REFRESH_TOKEN_EXPIRES });
    return {
        accessToken: accessToken,
        refreshToken: refreshToken,
    };
};
//DONE... _id problem
const login = async (req, res) => {
    try {
        const user = await users_model_1.default.findOne({ email: req.body.email });
        if (!user) {
            res.status(400).send("wrong username or password");
            return;
        }
        const validPassword = await bcrypt_1.default.compare(req.body.password, user.password);
        if (!validPassword) {
            res.status(400).send("wrong username or password");
            return;
        }
        if (!process.env.TOKEN_SECRET) {
            res.status(500).send("Server Error");
            return;
        }
        // generate token
        // const tokens = generateToken(user._id);
        // if (!tokens) {
        //   res.status(500).send("Server Error");
        //   return;
        // }
        // if (!user.refreshToken) {
        //   user.refreshToken = [];
        // }
        // user.refreshToken.push(tokens.refreshToken);
        // await user.save();
        // res.status(200).send({
        //   accessToken: tokens.accessToken,
        //   refreshToken: tokens.refreshToken,
        //   _id: user._id,
        // });
    }
    catch (error) {
        res.status(400).send(error);
    }
};
const verifyRefreshToken = (refreshToken) => {
    return new Promise((resolve, reject) => {
        if (!refreshToken) {
            reject("fail");
            return;
        }
        if (!process.env.TOKEN_SECRET) {
            reject("fail");
            return;
        }
        jsonwebtoken_1.default.verify(refreshToken, process.env.TOKEN_SECRET, async (err, payload) => {
            if (err) {
                reject("fail");
                return;
            }
            const userId = payload._id;
            try {
                const user = await users_model_1.default.findById(userId);
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
                const tokens = user.refreshToken.filter((token) => token !== refreshToken);
                user.refreshToken = tokens;
                //   resolve(user);
            }
            catch (err) {
                reject("fail");
                return;
            }
        });
    });
};
const logout = async (req, res) => {
    try {
        const user = await verifyRefreshToken(req.body.refreshToken);
        await user.save();
        res.status(200).send("success");
    }
    catch (err) {
        res.status(400).send("fail");
    }
};
const refresh = async (req, res) => {
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
        //send new token
    }
    catch (err) {
        res.status(400).send("fail");
    }
};
const authMiddleware = (req, res, next) => {
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
    jsonwebtoken_1.default.verify(token, process.env.TOKEN_SECRET, (err, payload) => {
        if (err) {
            res.status(401).send("Access Denied");
            return;
        }
        req.params.userId = payload._id;
        next();
    });
};
exports.authMiddleware = authMiddleware;
exports.default = { register, login, refresh, logout };
