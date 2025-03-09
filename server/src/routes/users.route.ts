import express from "express";
const router = express.Router();
const userController = require("../controllers/users.controller");
import { authMiddleware } from "../controllers/auth.controller";

router.get("/:id", userController.getUserById);

router.post("/", userController.createUser);

router.delete("/:id", userController.deleteUser);

router.put("/:id", authMiddleware, userController.updateUser);

module.exports = router;
// export default router;
