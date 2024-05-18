import express from "express";
import { pageLogin, pageRegister } from "../controllers/auth.controller";

const router = express.Router();

router.get("/register", pageRegister);
router.get("/login", pageLogin);

export default router;
