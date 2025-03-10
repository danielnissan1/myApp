"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const comments_controller_1 = __importDefault(require("../controllers/comments.controller"));
const auth_controller_1 = require("../controllers/auth.controller");
/**
 * @swagger
 * tags:
 *   name: Comments
 *   description: The Comments API
 */
/**
 * @swagger
 * components:
 *   schemas:
 *     Comment:
 *       type: object
 *       required:
 *         - text
 *         - postId
 *       properties:
 *         _id:
 *           type: string
 *           description: The auto-generated id of the comment
 *         text:
 *           type: string
 *           description: The content of the comment
 *         postId:
 *           type: string
 *           description: The ID of the post this comment belongs to
 *         owner:
 *           type: string
 *           description: The user ID of the comment's author
 *       example:
 *         _id: 12345abcde
 *         text: This is a comment on the post.
 *         postId: 67890fghij
 *         owner: 54321zyxwv
 */
/**
 * @swagger
 * /comments:
 *   get:
 *     summary: Get all comments
 *     tags: [Comments]
 *     responses:
 *       200:
 *         description: A list of comments
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Comment'
 *       500:
 *         description: Server error
 */
router.get("/", comments_controller_1.default.getAll.bind(comments_controller_1.default));
/**
 * @swagger
 * /comments/{id}:
 *   get:
 *     summary: Get a comment by ID
 *     tags: [Comments]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the comment
 *     responses:
 *       200:
 *         description: A single comment
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Comment'
 *       404:
 *         description: Comment not found
 *       500:
 *         description: Server error
 */
// router.get("/:id", commentsController.getById.bind(commentsController));
/**
 * @swagger
 * /comments/{id}:
 *   get:
 *     summary: Get all comments by post ID
 *     tags: [Comments]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the post
 *     responses:
 *       200:
 *         description: A list of comments
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Comment'
 *       404:
 *         description: Comments not found
 *       500:
 *         description: Server error
 */
router.get("/:id", comments_controller_1.default.getByPostId.bind(comments_controller_1.default));
/**
 * @swagger
 * /comments:
 *   post:
 *     summary: Create a new comment
 *     tags: [Comments]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               text:
 *                 type: string
 *                 description: The content of the comment
 *               postId:
 *                 type: string
 *                 description: The ID of the post this comment belongs to
 *             required:
 *               - text
 *               - postId
 *     responses:
 *       201:
 *         description: Comment created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Comment'
 *       400:
 *         description: Invalid input
 *       500:
 *         description: Server error
 */
router.post("/", auth_controller_1.authMiddleware, comments_controller_1.default.create.bind(comments_controller_1.default));
/**
 * @swagger
 * /comments/{id}:
 *   delete:
 *     summary: Delete a comment by ID
 *     tags: [Comments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the comment
 *     responses:
 *       200:
 *         description: Comment deleted successfully
 *       404:
 *         description: Comment not found
 *       500:
 *         description: Server error
 */
router.delete("/:id", auth_controller_1.authMiddleware, comments_controller_1.default.deleteItem.bind(comments_controller_1.default));
exports.default = router;
