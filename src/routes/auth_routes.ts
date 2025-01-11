import express, { Request, Response } from "express";
import authController from "../controllers/auth.controller";

const router = express.Router();

router.post("/register", (req: Request, res: Response) => {
  authController.register(req, res);
});

router.post("/login", (req: Request, res: Response) => {
  authController.login(req, res);
});

router.post("/refresh", (req: Request, res: Response) => {
  authController.refresh(req, res);
});

router.post("/logout", (req: Request, res: Response) => {
  authController.logout(req, res);
});

export default router;
