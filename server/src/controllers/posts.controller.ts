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

  async addLike(req: Request, res: Response) {
    const postId = req.params.postId;
    const userId = req.params.userId;
    try {
      const post = await postModel.findById(postId);
      if (post) {
        if (post.likes) {
          post.likes.push(new mongoose.Types.ObjectId(userId));
        } else {
          post.likes = [new mongoose.Types.ObjectId(userId)];
        }
        await post.save();
        res.send(post);
      } else {
        res.status(404).send("Post not found");
      }
    } catch (error) {
      res.status(400).send;
    }
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
}

export default new PostsController();
