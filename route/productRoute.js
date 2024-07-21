import express from "express";
const productRoute = express.Router();
import { addProductController } from "../controllers/productController.js";
productRoute.post("/add", addProductController);

export default productRoute;
