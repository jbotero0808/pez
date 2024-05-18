import express from "express";
import authRoutes from "../aplication/Auth/Routes/auth.routes";
import userRoutes from "../aplication/User/Routes/user.routes";
import postRoutes from "../aplication/Post/Routes/post.routes";
import commentRoutes from "../aplication/Commet/Routes/comment.routes";
import fishRoutes from "../aplication/Fish/Routes/fish.routes";

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/user", userRoutes);
router.use("/post", postRoutes);
router.use("/comment", commentRoutes);
router.use("/fish", fishRoutes);

export default router;
