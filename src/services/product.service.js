const prisma = require("../config/prisma");

const productService = {
  allProducts: async () => {
    return await prisma.product.findMany();
  },

  findProduct: async (id) => {
    return await prisma.product.findUnique({ where: { id } });
  },
};

module.exports = productService;
