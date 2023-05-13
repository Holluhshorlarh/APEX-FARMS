const productService = require("../services/product.service");

exports.getAllProducts = async (req, res) => {
  try {
    const products = await productService.allProducts();
    return res.status(200).json({ products });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

exports.getProduct = async (req, res) => {
  const id = req.params.id;
  try {
    const product = await productService.findProduct(id);
    if (!product)
      return res.status(400).json({ message: "No product with this id" });

    return res.status(200).json({ product });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
