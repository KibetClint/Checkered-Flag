import { Router } from "express";
import {
  getAllPosts,
  getAllPostsAdmin,
  getPostBySlug,
  createPost,
  updatePost,
  deletePost,
} from "../controllers/postController.js";

const router = Router();

router.get("/", getAllPosts);
router.get("/admin/all", getAllPostsAdmin); // ← must be before /:slug
router.get("/:slug", getPostBySlug);
router.post("/", createPost);
router.put("/:id", updatePost);
router.delete("/:id", deletePost);

export default router;
