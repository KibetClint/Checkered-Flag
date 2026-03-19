import type { Request, Response } from "express";
import { Post } from "../models/Post.js";
import mongoose from "mongoose";

export const getAllPosts = async (_req: Request, res: Response) => {
  try {
    const posts = await Post.find({ published: true }).sort({ createdAt: -1 });
    res.json(posts);
  } catch (error) {
    console.error("Get all posts error:", error);
    res.status(500).json({ message: "Failed to fetch posts", error });
  }
};

export const getAllPostsAdmin = async (_req: Request, res: Response) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });
    res.json(posts);
  } catch (error) {
    console.error("Get all posts admin error:", error);
    res.status(500).json({ message: "Failed to fetch posts", error });
  }
};

export const getPostBySlug = async (req: Request, res: Response) => {
  try {
    const { slug } = req.params;
    const isObjectId = mongoose.Types.ObjectId.isValid(slug);
    const post = isObjectId
      ? await Post.findById(slug)
      : await Post.findOne({ slug });

    if (!post) return res.status(404).json({ message: "Post not found" });
    res.json(post);
  } catch (error) {
    console.error("Get post error:", error);
    res.status(500).json({ message: "Failed to fetch post", error });
  }
};

export const createPost = async (req: Request, res: Response) => {
  try {
    const post = await Post.create(req.body);
    res.status(201).json(post);
  } catch (error: any) {
    console.error("Create post error:", error);
    if (error.code === 11000) {
      return res
        .status(400)
        .json({
          message:
            "A post with this slug already exists. Please use a different slug.",
        });
    }
    res.status(500).json({ message: "Failed to create post", error });
  }
};

export const updatePost = async (req: Request, res: Response) => {
  try {
    const post = await Post.findByIdAndUpdate(req.params["id"], req.body, {
      new: true,
    });
    if (!post) return res.status(404).json({ message: "Post not found" });
    res.json(post);
  } catch (error: any) {
    console.error("Update post error:", error);
    if (error.code === 11000) {
      return res
        .status(400)
        .json({
          message:
            "A post with this slug already exists. Please use a different slug.",
        });
    }
    res.status(500).json({ message: "Failed to update post", error });
  }
};

export const deletePost = async (req: Request, res: Response) => {
  try {
    await Post.findByIdAndDelete(req.params["id"]);
    res.json({ message: "Post deleted" });
  } catch (error) {
    console.error("Delete post error:", error);
    res.status(500).json({ message: "Failed to delete post", error });
  }
};
