const commentsModel = require("../models/comments.model");

const getAllComments = async (req, res) => {
  const filterByPostId = req.query.postId;
  try {
    if (filterByPostId) {
      const allCommentsOnPost = await commentsModel.find({
        postId: filterByPostId,
      });
      res.status(200).send(allCommentsOnPost);
    } else {
      const allCommentsOnPost = await commentsModel.find();
      res.send(allCommentsOnPost);
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const getCommentById = async (req, res) => {
  const commentId = req.params.id;
  try {
    const commentById = await commentsModel.findById(commentId);
    if (commentById != null) {
      res.status(200).send(commentById);
    } else {
      res.status(404).send("Comment not found");
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const createComment = async (req, res) => {
  const commentBody = req.body;
  try {
    const newComment = await commentsModel.create(commentBody);
    res.status(201).send(newComment);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const deleteComment = async (req, res) => {
  const commentId = req.params.id;
  try {
    const commentById = await commentsModel.findByIdAndDelete(commentId);
    if (commentById != null) {
      res.status(200).send(commentById);
    } else {
      res.status(404).send("Comment not found");
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const updateComment = async (req, res) => {
  const commentId = req.params.id;
  const updatedComment = req.body;
  try {
    const commentById = await commentsModel.findByIdAndUpdate(
      commentId,
      updatedComment
    );
    if (commentById != null) {
      res.status(200).send(commentById);
    } else {
      res.status(404).send("Comment not found");
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};

module.exports = {
  getAllComments,
  getCommentById,
  createComment,
  deleteComment,
  updateComment,
};
