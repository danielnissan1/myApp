import { Request, Response } from "express";
import BaseController from "./base.controller";
import LikesModel, { ILikes } from "../models/likes.model";

class LikesController extends BaseController<ILikes> {
  constructor() {
    super(LikesModel);
  }

  async create(req: Request, res: Response) {
    const like = {
      ...req.body,
    };
    req.body = like;
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

  async deleteLike(req: Request, res: Response) {
    const postId: string = req.params.postId;
    const userId: string = req.params.userId;

    try {
      const item = await this.model.findOneAndDelete({
        postId,
        owner: userId,
      });
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
export default new LikesController();
