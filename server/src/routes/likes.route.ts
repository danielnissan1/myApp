import express from "express";
const router = express.Router();
import { authMiddleware } from "../controllers/auth.controller";
import likesController from "../controllers/likes.controller";

/**
 * @swagger
 * tags:
 *   name: Likes
 *   description: The Likes API
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Like:
 *       type: object
 *       required:
 *         - postId
 *         - userId
 *       properties:
 *         _id:
 *           type: string
 *           description: The auto-generated id of the like
 *         postId:
 *           type: string
 *           description: The ID of the post this like belongs to
 *         userId:
 *           type: string
 *           description: The user ID of the like's author
 *       example:
 *         _id: 12345abcde
 *         postId: 67890fghij
 *         userId: 54321zyxwv
 */

/**
 * @swagger
 * /likes:
 *   get:
 *     summary: Get all likes
 *     tags: [Likes]
 *     responses:
 *       200:
 *         description: A list of likes
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Like'
 *       500:
 *         description: Server error
 */
router.get("/", likesController.getAll.bind(likesController));

/**
 * @swagger
 * /likes/{id}:
 *   get:
 *     summary: Get likes by post ID
 *     tags: [Likes]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the post
 *     responses:
 *       200:
 *         description: A list of likes for the post
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Like'
 *       404:
 *         description: Likes not found
 *       500:
 *         description: Server error
 */
router.get("/:id", likesController.getByPostId.bind(likesController));

/**
 * @swagger
 * /likes:
 *   post:
 *     summary: Create a new like
 *     tags: [Likes]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               postId:
 *                 type: string
 *                 description: The ID of the post this like belongs to
 *               userId:
 *                 type: string
 *                 description: The user ID of the like's author
 *             required:
 *               - postId
 *               - userId
 *     responses:
 *       201:
 *         description: Like created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Like'
 *       400:
 *         description: Invalid input
 *       500:
 *         description: Server error
 */
router.post("/", authMiddleware, likesController.create.bind(likesController));

/**
 * @swagger
 * /likes/{id}:
 *   delete:
 *     summary: Delete a like by ID
 *     tags: [Likes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the like
 *     responses:
 *       200:
 *         description: Like deleted successfully
 *       404:
 *         description: Like not found
 *       500:
 *         description: Server error
 */
router.delete(
  "/:id",
  authMiddleware,
  likesController.deleteItem.bind(likesController)
);

export default router;
