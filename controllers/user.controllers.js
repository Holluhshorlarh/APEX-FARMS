const bcrypt = require("bcrypt");
const prisma = require("../config/prisma");

exports.signUp = async (req, res) => {
  const { firstname, lastname, email, password } = req.body;
  try {
    const userExist = await prisma.person.findUnique({
      where: { email },
    });
    if (userExist) {
      return res
        .status(400)
        .json({ message: "user already exist, please login" });
    }

    // hash password
    const salt = await bcrypt.genSalt(10);
    const hashpwd = await bcrypt.hash(password, salt);

    const user = await prisma.person.create({
      data: {
        firstname,
        lastname,
        email,
        password: hashpwd,
      },
    });
    return res.status(201).json({
      status: "Success",
      message: `${user.firstname} account created successfully`,
      "user Id": user.id,
      email: user.email,
    });
  } catch (error) {
    return res.status(500).json({ status: "Failed", message: error.message });
  }
};
