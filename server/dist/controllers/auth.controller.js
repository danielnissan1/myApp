"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUser = exports.authMiddleware = void 0;
const users_model_1 = __importDefault(require("../models/users.model"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const google_auth_library_1 = require("google-auth-library");
const client = new google_auth_library_1.OAuth2Client();
const googleSignIn = async (req, res) => {
    try {
        const ticket = await client.verifyIdToken({
            idToken: req.body.credential,
            audience: process.env.GOOGLE_CLIENT_ID,
        });
        const payload = ticket.getPayload();
        const email = payload?.email;
        if (email) {
            let user = await users_model_1.default.findOne({ email: email });
            if (!user) {
                user = await users_model_1.default.create({
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
    }
    catch (err) {
        res.status(400).send(err);
    }
};
const register = async (req, res) => {
    try {
        const userByEmail = await users_model_1.default.findOne({ email: req.body.email });
        if (userByEmail) {
            return res.status(500).send("Email already exist");
        }
        const password = req.body.password;
        const salt = await bcrypt_1.default.genSalt(10);
        const hashedPassword = await bcrypt_1.default.hash(password, salt);
        const user = await users_model_1.default.create({
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
    }
    catch (error) {
        res.status(400).send(error);
    }
};
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
    }
    catch (err) {
        res.status(400).send(err);
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
                resolve(user);
            }
            catch (err) {
                reject("fail");
                return;
            }
        });
    });
};
const logout = async (req, res) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if (!token) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    try {
        jsonwebtoken_1.default.verify(token, process.env.TOKEN_SECRET, async (err, userInfo) => {
            if (err) {
                return res.status(403).json({ message: "Forbidden" });
            }
            const userId = userInfo?._id;
            if (!userId) {
                return res.status(404).json({ message: "User not found" });
            }
            const user = await users_model_1.default.findById(userId);
            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }
            user.refreshToken = [];
            await user.save();
            return res.status(200).json({ message: "User logged out" });
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error logging out user" });
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
const updateUser = async (req, res) => {
    const id = req.params.id;
    const newUsername = req.body.username;
    const newAvatar = req.body.avatar;
    try {
        const rs = await users_model_1.default.findByIdAndUpdate(id, {
            username: newUsername,
            avatar: newAvatar,
        });
        res.status(200).send("updated");
    }
    catch (error) {
        res.status(400).send(error);
    }
};
exports.updateUser = updateUser;
exports.default = { googleSignIn, register, login, refresh, logout, updateUser: exports.updateUser };
