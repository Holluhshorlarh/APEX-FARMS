const prisma = require("../config/prisma");

const UserServices = {
  findByEmail: async (email) => {
    const result = await prisma.person.findUnique({ where: { email } });
    return result;
  },
  findByPk: async (id) => {
    const result = await prisma.person.findUnique({ where: { id } });
    return result;
  },
  createUser: async (payload) => {
    const result = await prisma.person.create({
      data: payload,
    });
    return result;
  },
};

module.exports = UserServices;
