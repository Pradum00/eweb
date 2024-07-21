import mongoose from "mongoose";
const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  description: String,
  // Add more product fields as needed
});

export const Product = mongoose.model("Product", productSchema);
