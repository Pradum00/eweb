import express, { Router } from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import router from "./route/authRoute.js";
import cors from "cors";
import connectdb from "./config/db.js";
import productRoute from "./route/productRoute.js";
import cartRoute from "./route/cartRoute.js";

//configure env

dotenv.config();

// database config

connectdb();

const app = express();

// middlewares

app.use(express.json());
app.use(cors());

app.use(morgan("dev"));

// rest api

app.use("/api/v1/auth", router);
app.use("/api/v1/product", productRoute);
app.use("/api/v1/cart", cartRoute);

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server Running on ${process.env.DEV_MODE} mode on port ${PORT}`);
});
