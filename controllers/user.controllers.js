const bcrypt = require("bcrypt");
const User = require("../models/user.models");

exports.signUp = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  try {
    const userExist = await User.findOne({ email });
    if (userExist) {
      return res
        .status(400)
        .json({ message: "user already exist, please login" });
    }

    // hash password
    const salt = await bcrypt.genSalt(10);
    const hashpwd = await bcrypt.hash(password, salt);

    const user = await User.create({
      firstName,
      lastName,
      email,
      password: hashpwd,
    });
    return res.status(201).json({
      status: "Success",
      message: `${user.firstName} account created successfully`,
      "user Id": user._id,
      "first name": user.firstName,
      email: user.email,
    });
  } catch (error) {
    return res.status(500).json({ status: "Failed", message: error.message });
  }
};
