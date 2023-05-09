const prisma = require("../config/prisma");

const AdminService = {
  addProduct: async (payload) => {
    const result = await prisma.product.create({ data: payload });
    return result;
  },

  findProduct: async (name, category) => {
    const result = await prisma.product.findFirst({
      where: { name, category },
    });
    return result;
  },
};

module.exports = AdminService;
