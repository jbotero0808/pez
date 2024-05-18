import express from "express";
const authController = require("../Controller/auth.controller") ;

const router = express.Router();

router.post("/register", authController.apiRegister);
router.post("/login", authController.apiLogin);
router.get("/logout", authController.apiLogout);

export default router;
