const { Router } = require("express");
const {
  getAllProducts,
  getProduct,
} = require("../controllers/product.controller");

const router = Router();

router.get("/products", getAllProducts);
router.get("/product/:id", getProduct);

module.exports = router;
