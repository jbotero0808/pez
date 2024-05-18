import express from "express";
const commentController = require("../Controller/comment.controller");
const authController = require ("../../Auth/Controller/auth.controller");

const router = express.Router();

router.get("/", authController.verifyJWT, commentController.getComments);
router.post("/", authController.verifyJWT, commentController.createComment);
router.get("/:id", authController.verifyJWT, commentController.getComment);
router.put("/:id", authController.verifyJWT, commentController.updateComment);
router.delete("/:id", authController.verifyJWT, commentController.deleteComment);
router.get("/user/:id", authController.verifyJWT, commentController.getUserComments);
router.get("/post/:id", authController.verifyJWT, commentController.getPostComments);

export default router;