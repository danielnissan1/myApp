const UserModel = require("../models/user.model");

const getUserById = async (req, res) => {
  const userId = req.params.id;

  try {
    const userById = await userModel.findById(postId);
    if (userById != null) {
      // Fix for null check
      res.send(userById);
    } else {
      res.status(404).send("user not found");
    }
  } catch (error) {
    res.status(400).send("Invalid user ID format");
  }
};

const createUser = async (req, res) => {
  const userBody = req.body;
  try {
    const newUser = await UserModel.create(userBody);
    res.status(201).send(newUser);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const updateUser = async (req, res) => {
  const userId = req.params.id;
  const updateData = req.body;

  try {
    const updatedUser = await UserModel.findByIdAndUpdate(userId, updateData, {
      new: true, // Return the updated document
      runValidators: true, // Run validation on the updated data
    });
    if (updatedUser != null) {
      res.status(200).send(updatedUser);
    } else {
      res.status(404).send("User not found");
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const deleteUser = async (req, res) => {
  const userId = req.params.id;

  try {
    const deletedUser = await UserModel.findByIdAndDelete(userId);

    if (!deletedUser) {
      return res.status(404).send("User not found");
    }
    res.status(200).send(deletedPost);
  } catch (error) {
    res.status(400).send("Invalid User ID format");
  }
};

module.exports = {
  createUser,
  deleteUser,
  getUserById,
  updateUser,
};
