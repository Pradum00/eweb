import express from "express";
const cartRoute = express.Router();
import { addCartController } from "../controllers/cartController.js";
import { requireSignIn } from "../middlewares/authMiddleware.js";
cartRoute.post("/add", requireSignIn, addCartController);

export default cartRoute;
