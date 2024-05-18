import express from "express";
import { getCommentsPerPost } from "../controllers/comments.controller";

const router = express.Router();

router.get("/:idPost", getCommentsPerPost);

export default router;
