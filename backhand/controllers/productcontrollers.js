import Product from "../models/product.js";

// create a new product
export const createProduct = async (req, res) => {
  try {
    const newProduct = await Product.create(req.body);

    res.json({
      message: "Product created successfully",
      newProduct,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// get all products
export const getProduct = async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// update product
export const updateproduct = async (req, res) => {
  try {
    const updated = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json({
      message: "Product updated successfully",
      updated,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// delete product
export const deleteproduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: "Product deleted Successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};