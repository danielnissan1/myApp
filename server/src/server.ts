import express, { Express } from "express";
import mongoose from "mongoose";
// import postsController from './controllers/post.controller';
// import commentsController from './controllers/comment.controller';
// import authenticate from './middlewares/auth.middleware';
// import authController from './controllers/auth.controller';
// import usersController from './controllers/user.controller';
// import { swaggerSpec } from './swagger';
import cors from "cors";
import https, { Server as HttpsServer } from "https";
import http, { Server as HttpServer } from "http";
import path from "path";
import swaggerUi from "swagger-ui-express";
import dotenv from "dotenv";
import readCertificates from "./utils/readCertificates";
import postsRoute from "./routes/posts.route";
import commentsRoute from "./routes/comments.route";
import authRoutes from "./routes/auth_routes";
import priceRec from "./routes/priceRec.routes";
import fileRoutes from "./routes/file.routes";
import { ServerInfo } from "./app";
dotenv.config();

const serverPromise: Promise<ServerInfo> = new Promise((resolve, reject) => {
  const isProduction = process.env.NODE_ENV === "production";

  const mongoURI: string = isProduction
    ? process.env.PROD_MONGO_URI || ""
    : process.env.DB_CONNECT || "";

  mongoose
    .connect(mongoURI)
    .then(() => {
      console.log("Connected to MongoDB");
      const app: Express = express();

      const prefix = "/api";
      // app.use(cors());

      app.use(
        cors({
          origin: "http://localhost:3000", // Change this to your frontend URL
          credentials: true, // Allows cookies and auth headers
        })
      );

      app.use(express.json());
      app.use(`${prefix}/posts`, postsRoute);
      app.use(`${prefix}/comments`, commentsRoute);
      app.use(`${prefix}/auth`, authRoutes);
      app.use(`${prefix}/priceRec`, priceRec);
      app.use(`${prefix}/file`, fileRoutes);
      app.options("*", cors());
      // Serve static files from the public directory
      app.use(
        `${prefix}/media`,
        express.static(path.join(__dirname, "../public"))
      );

      // CLIENT -> Serve static files from the build directory
      app.use(express.static(path.join(__dirname, "../build")));

      // CLIENT -> Serve index.html from the build directory for all other routes
      app.get("*", (req, res) => {
        res.sendFile(path.join(__dirname, "../build", "index.html"));
      });

      app.get(`${prefix}`, (req, res) => {
        res.send("Server is here");
      });

      if (isProduction) {
        console.log("Production mode");

        const { privateKey, certificate } = readCertificates();

        const server: HttpsServer = https.createServer(
          {
            key: privateKey,
            cert: certificate,
          },
          app
        );

        resolve({
          server,
          port: Number(process.env.HTTPS_PORT),
          link: `https://localhost:${process.env.HTTPS_PORT}`,
        });
      } else {
        console.log("Development mode");
        const server: HttpServer = http.createServer(app);
        resolve({
          server,
          port: Number(process.env.HTTP_PORT),
          link: `http://localhost:${process.env.HTTP_PORT}`,
        });
      }
    })
    .catch((err) => console.error(err));
});

export default serverPromise;
