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

  async getByPostId(req: Request, res: Response) {
    const id: string = req.params.id;

    try {
      const item = await this.model.find({ postId: id });
      if (item != null) {
        res.send(item);
      } else {
        res.status(404).send("not found");
      }
    } catch (error) {
      res.status(400).send(error);
    }
  }
}
export default new CommentsController();
