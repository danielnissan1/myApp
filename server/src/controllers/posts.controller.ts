import postModel, { IPost } from "../models/posts.model";
import { Request, Response } from "express";
import BaseController from "./base.controller";
import mongoose from "mongoose";

class PostsController extends BaseController<IPost> {
  constructor() {
    super(postModel);
  }

  async create(req: Request, res: Response) {
    const userId = req.params.userId;
    const post = {
      ...req.body,
      owner: userId,
    };
    req.body = post;
    super.create(req, res);
  }

  async getAllPosts(req: Request, res: Response) {
    const filter = req.query.owner;
    const page = parseInt(req.query.page as string) || 1;
    const limit = 10;
    try {
      const totalPosts = await postModel.countDocuments();
      const totalPages = Math.ceil(totalPosts / limit);
      const posts = await postModel
        .find({})
        .populate("owner", "avatar username")
        .skip((page - 1) * limit)
        .limit(limit)
        .lean();

      const postIds = posts.map((post) => post._id);

      const postsWithLikes = await postModel.aggregate([
        { $match: { _id: { $in: postIds } } },
        {
          $lookup: {
            from: "users",
            localField: "likes",
            foreignField: "_id",
            as: "likes",
          },
        },
      ]);

      const postsWithCounts = posts.map((post) => {
        const postWithLikes = postsWithLikes.find(
          (p) => p._id.toString() === post._id.toString()
        );
        return {
          ...post,
          likes: postWithLikes?.likes || [],
        };
      });

      res.send({ posts: postsWithCounts, totalPages });
    } catch (error) {
      res.status(400).send(error);
    }
  }

  async addLike(req: Request, res: Response): Promise<void> {
    const postId = req.body.postId;
    const userId = req.body.userId;

    try {
      const post = await postModel.findById(postId);

      if (!post) {
        res.status(404).send({ message: "Post not found" });
        return;
      }

      if (post.likes.includes(userId)) {
        res.status(400).send({ message: "You already liked this post" });
        return;
      }
      post.likes.push(userId);
      await post.save();

      res.status(200).send({ message: "Post liked successfully", post });
    } catch (error) {
      res.status(500).send({ message: "Error liking the post", error });
    }
  }

  async removeLike(req: Request, res: Response): Promise<void> {
    const postId = req.body.postId;
    const userId = req.body.userId;

    try {
      const post = await postModel.findById(postId);

      if (!post) {
        res.status(404).send({ message: "Post not found" });
        return;
      }

      if (!post.likes.includes(userId)) {
        res.status(400).send({ message: "You haven't liked this post" });
        return;
      }

      post.likes = post.likes.filter(
        (like) => like.toString() !== userId.toString()
      );
      await post.save();

      res.status(200).send({ message: "Post unliked successfully", post });
    } catch (error) {
      res.status(500).send({ message: "Error unliking the post", error });
    }
  }

  async updateItem(req: Request, res: Response) {
    const id = req.params.id;
    const newContent = req.body.content;
    const newLocation = req.body.location;
    const newPrice = req.body.price;
    const newSoldStatus = req.body.isSold;
    const newImg = req.body.imgSrc;

    try {
      const rs = await this.model.findByIdAndUpdate(id, {
        content: newContent,
        location: newLocation,
        price: newPrice,
        isSold: newSoldStatus,
        imgSrc: newImg,
      });
      res.status(200).send("updated");
    } catch (error) {
      res.status(400).send(error);
    }
  }

  async getByUserId(req: Request, res: Response) {
    const userId = req.params.id;
    try {
      const posts = await postModel.find({ owner: userId });
      console.log("posts to send:", posts);
      res.send(posts);
    } catch (error) {
      res.status(400).send(error);
    }
  }
}
export default new PostsController();
