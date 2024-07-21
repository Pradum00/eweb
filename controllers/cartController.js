import { Cart } from "../models/cartModel.js";
import { Product } from "../models/productModel.js";

// Add to Cart Controller
export async function addCartController(req, res) {
  try {
    const { userId } = req.body;
    console.log(req.body);
    const productId = req.body.items[0].productId;
    const quantity = req.body.items[0].quantity;

    console.log("Received request to add product to cart:", {
      userId,
      productId,
      quantity,
    });

    // Find the product to ensure it exists
    const product = await Product.findById({ _id: productId });
    console.log("Product fetched from DB:", product);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Find the user's cart
    let cart = await Cart.findOne({ userId }).exec();
    console.log("User cart fetched from DB:", cart);

    if (!cart) {
      // If the cart doesn't exist, create a new one
      cart = new Cart({
        userId,
        items: [{ productId, quantity }],
      });
      console.log("Created new cart for user:", cart);
    } else {
      // If the cart exists, check if the product is already in the cart
      const itemIndex = cart.items.findIndex(
        (item) => item.productId.toString() === productId
      );

      if (itemIndex > -1) {
        // If the product is in the cart, update the quantity
        cart.items[itemIndex].quantity += quantity;
        console.log(`Updated quantity for product ${productId} in cart.`);
      } else {
        // If the product is not in the cart, add it to the cart
        cart.items.push({ productId, quantity });
        console.log(`Added product ${productId} to cart.`);
      }
    }

    // Save the cart
    await cart.save();
    console.log("Cart saved to DB:", cart);

    res.status(200).json({ message: "Product added to cart", cart });
  } catch (error) {
    console.error("Error in addCartController:", error);
    res.status(500).json({ message: "Server error" });
  }
}
