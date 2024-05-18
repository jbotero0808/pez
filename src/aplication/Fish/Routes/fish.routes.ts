import express from "express";
import {
  createFish,
  createManyFish,
  deleteFish,
  getFish,
  getFishes,
  updateFish,

} from "../Controller/fish.controller";
const authController = require ("../../Auth/Controller/auth.controller");

const router = express.Router();

router.post("/", authController.verifyJWT, createFish);
router.post("/many", authController.verifyJWT, createManyFish);
router.delete("/:id", authController.verifyJWT, deleteFish);
router.get("/:id", authController.verifyJWT, getFish);
router.get("/", authController.verifyJWT, getFishes);
router.put("/:id", authController.verifyJWT,  updateFish);

export default router;
