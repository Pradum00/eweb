import express from "express";
const router = express.Router();
import {
  registerController,
  loginController,
} from "../controllers/authController.js";

// routing

router.post("/register", registerController);

// LOGIN || POST
router.post("/login", loginController);

export default router;
