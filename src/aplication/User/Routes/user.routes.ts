import express from "express";
const userController = require("../../User/Controller/user.controller"); 
const authController = require("../../Auth/Controller/auth.controller"); 

const router = express.Router();

router.get("/", authController.verifyJWT, userController.getUsers);
router.post("/", authController.verifyJWT, userController.createUser);
router.get("/:id", authController.verifyJWT, userController.getUser);
router.put("/:id", authController.verifyJWT, userController.updateUser);
router.delete("/:id", authController.verifyJWT, userController.deleteUser);

export default router;
