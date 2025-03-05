import postModel, { IPost } from "../models/posts.model";
import { Request, Response } from "express";
import BaseController from "./base.controller";
import mongoose from "mongoose";

class PostsController extends BaseController<IPost> {
  constructor() {
    super(postModel);
  }

  async create(req: Request, res: Response) {
    const userId = req.params.userId;
    const post = {
      ...req.body,
      owner: userId,
    };
    req.body = post;
    super.create(req, res);
  }

  async getAllPosts(req: Request, res: Response) {
    const filter = req.query.owner;
    try {
      if (filter) {
        const posts = await postModel
          .find()
          .populate("owner", "username avatar")
          .populate("likes");
        res.send(posts);
      } else {
        const items = await this.model
          .find()
          .populate("owner", "avatar")
          .lean();
        res.send(items);
      }
    } catch (error) {
      res.status(400).send(error);
    }
  }

  // Add Like to Post

  // Add Like to Post
  async addLike(req: Request, res: Response): Promise<void> {
    const postId = req.params.postId;
    const userId = req.body.userId; // Assumes the user ID is passed in the request body

    try {
      const post = await postModel.findById(postId);

      if (!post) {
        res.status(404).send({ message: "Post not found" });
        return; // Ensure the function exits after sending a response
      }

      // Check if the user has already liked the post
      if (post.likes.includes(userId)) {
        res.status(400).send({ message: "You already liked this post" });
        return;
      }

      // Add the userId to the likes array
      post.likes.push(userId);
      await post.save();

      res.status(200).send({ message: "Post liked successfully", post });
    } catch (error) {
      res.status(500).send({ message: "Error liking the post", error });
    }
  }

  // Remove Like from Post
  async removeLike(req: Request, res: Response): Promise<void> {
    const postId = req.params.postId;
    const userId = req.body.userId; // Assumes the user ID is passed in the request body

    try {
      const post = await postModel.findById(postId);

      if (!post) {
        res.status(404).send({ message: "Post not found" });
        return;
      }

      // Check if the user has liked the post
      if (!post.likes.includes(userId)) {
        res.status(400).send({ message: "You haven't liked this post" });
        return;
      }

      // Remove the userId from the likes array
      post.likes = post.likes.filter(
        (like) => like.toString() !== userId.toString()
      );
      await post.save();

      res.status(200).send({ message: "Post unliked successfully", post });
    } catch (error) {
      res.status(500).send({ message: "Error unliking the post", error });
    }
  }
}

export default new PostsController();
