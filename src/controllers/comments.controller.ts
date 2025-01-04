import commentsModel from "../models/comments.model";
import { Request, Response } from "express";

const getAllComments = async (req: Request, res: Response): Promise<void> => {
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
  } catch (error: any) {
    res.status(400).send(error.message);
  }
};

const getCommentById = async (req: Request, res: Response): Promise<void> => {
  const commentId = req.params.id;
  try {
    const commentById = await commentsModel.findById(commentId);
    if (commentById != null) {
      res.status(200).send(commentById);
    } else {
      res.status(404).send("Comment not found");
    }
  } catch (error: any) {
    res.status(400).send(error.message);
  }
};

const createComment = async (req: Request, res: Response): Promise<void> => {
  const commentBody = req.body;
  try {
    const newComment = await commentsModel.create(commentBody);
    res.status(201).send(newComment);
  } catch (error: any) {
    res.status(400).send(error.message);
  }
};

const deleteComment = async (req: Request, res: Response): Promise<void> => {
  const commentId = req.params.id;
  try {
    const commentById = await commentsModel.findByIdAndDelete(commentId);
    if (commentById != null) {
      res.status(200).send(commentById);
    } else {
      res.status(404).send("Comment not found");
    }
  } catch (error: any) {
    res.status(400).send(error.message);
  }
};

const updateComment = async (req: Request, res: Response): Promise<void> => {
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
  } catch (error: any) {
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
