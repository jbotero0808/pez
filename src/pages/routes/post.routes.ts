import express from "express";
import { getAllPosts, getPost } from "../controllers/post.controller";

const router = express.Router();

router.get("/", getAllPosts);
router.get("/:id", getPost)

export default router;
