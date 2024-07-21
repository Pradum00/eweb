import { Product } from "../models/productModel.js";
export async function addProductController(req, res) {
  try {
    const { name, price, description } = req.body;
    const newProduct = await new Product({
      name,
      price,
      description,
    }).save();

    res.status(201).send({
      success: true,
      message: "Product add Successfully",
      newProduct,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error in product creation",
      error,
    });
  }
}
