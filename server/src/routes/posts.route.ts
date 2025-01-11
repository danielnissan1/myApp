import express from "express";
const router = express.Router();
import postsController from "../controllers/posts.controller";
// import { authMiddleware } from "../controllers/auth_controller";

/**
 * @swagger
 * tags:
 *   name: Posts
 *   description: The Posts API
 */

router.get("/", postsController.getAll.bind(postsController));

router.get("/:id", postsController.getById.bind(postsController));

router.post("/", postsController.create.bind(postsController));

router.delete("/:id", postsController.deleteItem.bind(postsController));

export default router;
