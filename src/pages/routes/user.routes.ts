import express from 'express';
import { pageGetUsers, pageUpdateUser } from '../controllers/user.controller';
const authController = require("../../aplication/Auth/Controller/auth.controller");
const router = express.Router();

router.get('/', authController.verifyJWT, pageGetUsers);
router.get('/edit/:id', authController.verifyJWT, pageUpdateUser);

export default router;
