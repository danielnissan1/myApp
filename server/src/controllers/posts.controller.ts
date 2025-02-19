import postModel, { IPost } from "../models/posts.model";
import { Request, Response } from "express";
import BaseController from "./base.controller";

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
          .populate("owner", "username avatar");
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
