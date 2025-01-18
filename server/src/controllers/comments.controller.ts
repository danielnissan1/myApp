import commentsModel, { IComments } from "../models/comments.model";
import { Request, Response } from "express";
import BaseController from "./base.controller";

class CommentsController extends BaseController<IComments> {
  constructor() {
    super(commentsModel);
  }

  async create(req: Request, res: Response) {
    const comment = {
      ...req.body,
    };
    req.body = comment;
    super.create(req, res);
  }
}

export default new CommentsController();
