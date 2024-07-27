import express from "express"
import { loginController, registerController } from "../controllers/userController.js";

const router = express.Router();

// LOGIN USER
router.post('/login',loginController);

// REGISTER USER
router.post('/register',registerController);




export default router;