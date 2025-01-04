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
}

export default new PostsController();
