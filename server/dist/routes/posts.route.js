"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const posts_controller_1 = __importDefault(require("../controllers/posts.controller"));
const auth_controller_1 = require("../controllers/auth.controller");
/**
 * @swagger
 * tags:
 *   name: Posts
 *   description: API for managing posts
 */
/**
 * @swagger
 * components:
 *   schemas:
 *     Post:
 *       type: object
 *       required:
 *         - title
 *         - content
 *       properties:
 *         _id:
 *           type: string
 *           description: The auto-generated ID of the post
 *         title:
 *           type: string
 *           description: The title of the post
 *         content:
 *           type: string
 *           description: The content of the post
 *         owner:
 *           type: string
 *           description: The ID of the owner of the post
 *       example:
 *         _id: 63d9c7d5a24b56001734e7c0
 *         title: My First Post
 *         content: This is my first post's content.
 *         owner: 63d9c7d5a24b56001734e7bf
 */
/**
 * @swagger
 * /posts:
 *   get:
 *     summary: Retrieve all posts
 *     tags:
 *       - Posts
 *     responses:
 *       200:
 *         description: A list of all posts
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Post'
 *       500:
 *         description: Server error
 */
// router.get("/", postsController.getAll.bind(postsController));
/**
 * @swagger
 * /posts:
 *   get:
 *     summary: Retrieve all posts
 *     tags:
 *       - Posts
 *     responses:
 *       200:
 *         description: A list of all posts
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Post'
 *       500:
 *         description: Server error
 */
router.get("/", posts_controller_1.default.getAllPosts.bind(posts_controller_1.default));
/**
 * @swagger
 * /posts/{id}:
 *   get:
 *     summary: Retrieve a post by ID
 *     tags:
 *       - Posts
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the post
 *     responses:
 *       200:
 *         description: The requested post
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Post'
 *       404:
 *         description: Post not found
 *       500:
 *         description: Server error
 */
router.get("/:id", auth_controller_1.authMiddleware, posts_controller_1.default.getByUserId.bind(posts_controller_1.default));
/**
 * @swagger
 * /posts:
 *   post:
 *     summary: Create a new post
 *     tags:
 *       - Posts
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: The title of the post
 *               content:
 *                 type: string
 *                 description: The content of the post
 *             required:
 *               - title
 *               - content
 *     responses:
 *       201:
 *         description: Post created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Post'
 *       401:
 *         description: Unauthorized
 *       400:
 *         description: Bad request
 *       500:
 *         description: Server error
 */
router.post("/", auth_controller_1.authMiddleware, posts_controller_1.default.create.bind(posts_controller_1.default));
/**
 * @swagger
 * /posts/{id}:
 *   delete:
 *     summary: Delete a post by ID
 *     tags:
 *       - Posts
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the post
 *     responses:
 *       200:
 *         description: Post deleted successfully
 *       404:
 *         description: Post not found
 *       500:
 *         description: Server error
 */
router.delete("/:id", auth_controller_1.authMiddleware, posts_controller_1.default.deleteItem.bind(posts_controller_1.default));
/**
 * @swagger
 * /posts/{id}:
 *   put:
 *     summary: Update a post by ID
 *     tags:
 *       - Posts
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the post
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Post'
 *     responses:
 *       200:
 *         description: Post updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Post'
 *       404:
 *         description: Post not found
 *       500:
 *         description: Server error
 */
router.put("/:id", auth_controller_1.authMiddleware, posts_controller_1.default.updateItem.bind(posts_controller_1.default));
/**
 * @swagger
 * /posts/addlike:
 *   post:
 *     summary: Add like to a post
 *     tags:
 *       - Posts
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
 *                 description: The ID of the post
 *               userId:
 *                 type: string
 *                 description: The ID of the user
 *             required:
 *               - postId
 *               - userId
 *     responses:
 *       200:
 *         description: Like added successfully
 *       400:
 *         description: Bad request
 *       500:
 *         description: Server error
 */
router.post("/addlike", auth_controller_1.authMiddleware, posts_controller_1.default.addLike.bind(posts_controller_1.default));
/**
 * @swagger
 * /posts/removelike:
 *   post:
 *     summary: Remove like from a post
 *     tags:
 *       - Posts
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
 *                 description: The ID of the post
 *               userId:
 *                 type: string
 *                 description: The ID of the user
 *             required:
 *               - postId
 *               - userId
 *     responses:
 *       200:
 *         description: Like removed successfully
 *       400:
 *         description: Bad request
 *       500:
 *         description: Server error
 */
router.post("/removelike", auth_controller_1.authMiddleware, posts_controller_1.default.removeLike.bind(posts_controller_1.default));
exports.default = router;
