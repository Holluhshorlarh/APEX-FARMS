const mongoose = require("mongoose");

const connDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to Database Successfully");
  } catch (error) {
    console.log(error);
  }
};

module.exports = connDB;
