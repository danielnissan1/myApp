import commentsModel, { IComments } from "../models/comments.model";
import { Request, Response } from "express";
import BaseController from "./base.controller";

const commentsController = new BaseController<IComments>(commentsModel);

export default commentsController;
