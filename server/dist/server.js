"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
// import postsController from './controllers/post.controller';
// import commentsController from './controllers/comment.controller';
// import authenticate from './middlewares/auth.middleware';
// import authController from './controllers/auth.controller';
// import usersController from './controllers/user.controller';
// import { swaggerSpec } from './swagger';
const cors_1 = __importDefault(require("cors"));
const https_1 = __importDefault(require("https"));
const http_1 = __importDefault(require("http"));
const path_1 = __importDefault(require("path"));
const dotenv_1 = __importDefault(require("dotenv"));
const readCertificates_1 = __importDefault(require("./utils/readCertificates"));
const posts_route_1 = __importDefault(require("./routes/posts.route"));
const comments_route_1 = __importDefault(require("./routes/comments.route"));
const auth_routes_1 = __importDefault(require("./routes/auth_routes"));
const priceRec_routes_1 = __importDefault(require("./routes/priceRec.routes"));
const file_routes_1 = __importDefault(require("./routes/file.routes"));
dotenv_1.default.config();
const serverPromise = new Promise((resolve, reject) => {
    const isProduction = process.env.NODE_ENV === "production";
    const mongoURI = isProduction
        ? process.env.PROD_MONGO_URI || ""
        : process.env.DB_CONNECT || "";
    mongoose_1.default
        .connect(mongoURI)
        .then(() => {
        console.log("Connected to MongoDB");
        const app = (0, express_1.default)();
        const prefix = "/api";
        app.use((0, cors_1.default)());
        app.use(express_1.default.json());
        app.use("/posts", posts_route_1.default);
        app.use("/comments", comments_route_1.default);
        app.use("/auth", auth_routes_1.default);
        app.use("/priceRec", priceRec_routes_1.default);
        app.use("/file", file_routes_1.default);
        app.options("*", (0, cors_1.default)());
        // Serve static files from the public directory
        app.use(`${prefix}/media`, express_1.default.static(path_1.default.join(__dirname, "../public")));
        // CLIENT -> Serve static files from the build directory
        app.use(express_1.default.static(path_1.default.join(__dirname, "../build")));
        // CLIENT -> Serve index.html from the build directory for all other routes
        app.get("*", (req, res) => {
            res.sendFile(path_1.default.join(__dirname, "../build", "index.html"));
        });
        app.get(`${prefix}`, (req, res) => {
            res.send("Server is here");
        });
        if (isProduction) {
            console.log("Production mode");
            const { privateKey, certificate } = (0, readCertificates_1.default)();
            const server = https_1.default.createServer({
                key: privateKey,
                cert: certificate,
            }, app);
            resolve({
                server,
                port: Number(process.env.HTTPS_PORT),
                link: `https://localhost:${process.env.HTTPS_PORT}`,
            });
        }
        else {
            console.log("Development mode");
            const server = http_1.default.createServer(app);
            resolve({
                server,
                port: Number(process.env.HTTP_PORT),
                link: `http://localhost:${process.env.HTTP_PORT}`,
            });
        }
    })
        .catch((err) => console.error(err));
});
exports.default = serverPromise;
