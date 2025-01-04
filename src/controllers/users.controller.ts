import usersModel, { IUser } from "../models/users.model";
import { Request, Response } from "express";
import BaseController from "./base.controller";

const usersController = new BaseController<IUser>(usersModel);

export default usersController;
