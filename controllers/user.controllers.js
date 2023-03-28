const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
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

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await prisma.person.findUnique({ where: { email } });
    if (!user) {
      return res
        .status(400)
        .json({ message: "User does not exist, please sign up" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid password" });
    }

    const tokenData = {
      id: user.id,
      email: email.id,
      role: user.role,
    };

    const token = await jwt.sign(tokenData, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRE,
    });

    res.cookie("access-token", token);
    return res.status(200).json({
      status: "Success",
      message: `${user.firstname} logged in successfully`,
      "user id": user.id,
      "user email": user.email,
      token,
    });
  } catch (error) {
    return res.status(500).json({ status: "Failed", message: error.message });
  }
};
