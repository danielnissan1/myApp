// const postModel = require("../models/posts.model");
const PostModel = require("../models/posts.model");

const getAllPosts = async (req, res) => {
  const filter = req.query.owner;
  try {
    if (filter) {
      const allposts = await PostModel.find({ owner: filter });
      res.send(allposts);
    } else {
      const allpostsbyUser = await PostModel.find();
      res.send(allpostsbyUser);
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const getPostById = async (req, res) => {
  const postId = req.params.id;

  try {
    const postById = await PostModel.findById(postId);
    if (post != null) {
      res.send(postById);
    } else {
      res.status(404).send("Post not found");
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const createPost = async (req, res) => {
  const postBody = req.body;
  try {
    const newPost = await PostModel.create(postBody);
    res.status(201).send(newPost);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const deletePost = async (req, res) => {
  const postId = req.params.id;
  try {
    const rs = await postModel.findByIdAndDelete(postId);
    res.status(200).send(rs);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const updatePost = async (req, res) => {
  const postId = req.params.id;
  const updateData = req.body;

  try {
    const updatedPost = await PostModel.findByIdAndUpdate(postId, updateData, {
      new: true, // Return the updated document
      runValidators: true, // Run validation on the updated data
    });
    if (updatedPost != null) {
      res.status(200).send(updatedPost);
    } else {
      res.status(404).send("Post not found");
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};

module.exports = {
  getAllPosts,
  createPost,
  deletePost,
  getPostById,
  updatePost, // Export the new function
};
