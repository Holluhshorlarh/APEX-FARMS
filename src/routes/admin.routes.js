const express = require("express");

const { isAuth, isAdmin } = require("../middleware/auth");
const { createProduct } = require("../controllers/admin.controllers");
const { validateAddProducts } = require("../middleware/validate");

const router = express.Router();

router.post(
  "/admin/product",
  isAuth,
  isAdmin,
  validateAddProducts,
  createProduct
);

module.exports = router;
