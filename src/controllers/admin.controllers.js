const AdminService = require("../services/admin.service");

exports.createProduct = async (req, res) => {
  const { name, category, quantity, price } = req.body;

  try {
    //check if product already exists
    const checkProduct = await AdminService.findProduct(name, category);
    if (checkProduct)
      return res.status(400).json({
        message: "Oops product already exists, just modify the quantity",
      });

    const payload = { name, category, quantity, price };
    const product = await AdminService.addProduct(payload);

    return res
      .status(201)
      .json({ message: "product added successfully", product });
  } catch (error) {
    return res.status(500).json(error.message);
  }
};
