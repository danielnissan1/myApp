import express from "express";
const router = express.Router();
const userController = require("../controllers/users.controller");

router.get("/:id", userController.getUserById);

router.post("/", userController.createUser);

router.delete("/:id", userController.deleteUser);

router.put("/:id", userController.updateUser);

module.exports = router;
