import express from "express";
const router = express.Router();
import commentsController from "../controllers/comments.controller";
import { authMiddleware } from "../controllers/auth.controller";

/**
 * @swagger
 * tags:
 *   name: Comments
 *   description: The Comments API
 */

router.get("/", commentsController.getAll.bind(commentsController));

router.get("/:id", commentsController.getById.bind(commentsController));

router.post(
  "/",
  authMiddleware,
  commentsController.create.bind(commentsController)
);

router.delete(
  "/:id",
  authMiddleware,
  commentsController.deleteItem.bind(commentsController)
);

export default router;
