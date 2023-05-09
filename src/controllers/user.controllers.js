const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const UserServices = require("../services/user.service");

exports.signUp = async (req, res) => {
  let { firstname, lastname, email, password } = req.body;
  try {
    const userExist = await UserServices.findByEmail(email);
    if (userExist) {
      return res
        .status(400)
        .json({ message: "user already exist, please login" });
    }

    // hash password
    const salt = await bcrypt.genSalt(10);
    const pwdhash = await bcrypt.hash(password, salt);
    password = pwdhash;

    let payload = { firstname, lastname, email, password };
    const user = await UserServices.createUser(payload);
    return res.status(201).json({
      status: "Success",
      message: `${user.firstname} account created successfully`,
      "user Id": user.id,
      email: user.email,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ status: "Failed", message: error.message });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await UserServices.findByEmail(email);
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
      email: user.email,
      roles: user.roles,
    };

    const token = jwt.sign(tokenData, process.env.JWT_SECRET, {
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
