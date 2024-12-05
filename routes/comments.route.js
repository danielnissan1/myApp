const express = require("express");
const router = express.Router();
const commentsController = require("../controllers/comments.controller");

router.get("/", commentsController.getAllComments);

router.get("/:id", commentsController.getCommentById);

router.post("/", commentsController.createComment);

router.delete("/:id", commentsController.deleteComment);

router.put("/:id", commentsController.updateComment);

module.exports = router;
