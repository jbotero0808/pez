import express from "express";
import {
  createPost,
  deletePost,
  getPost,
  getPosts,
  updatePost,
} from "../../Post/Controller/post.controller";
const authController = require ("../../Auth/Controller/auth.controller");

const router = express.Router();

router.get("/", authController.verifyJWT, getPosts);
router.post("/", authController.verifyJWT, createPost);
router.get("/:id", authController.verifyJWT, getPost);
router.put("/:id", authController.verifyJWT, updatePost);
router.delete("/:id", authController.verifyJWT, deletePost);

export default router;
