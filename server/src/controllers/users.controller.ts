import usersModel, { IUser } from "../models/users.model";
import { Request, Response } from "express";
import BaseController from "./base.controller";

class usersController extends BaseController<IUser> {
  constructor() {
    super(usersModel);
  }
}

export default usersController;
