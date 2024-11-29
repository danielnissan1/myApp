const express = require("express");
const router = express.Router();
const postsController = require("../controllers/posts.controller");

router.get("/", postsController.getAllPosts);

router.get("/:id", postsController.getPostById);

router.post("/", postsController.createPost);

router.delete("/:id", postsController.deletePost);

router.put("/:id", postsController.updatePost);

module.exports = router;
