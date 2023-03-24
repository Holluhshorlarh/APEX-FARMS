require("dotenv").config();
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const connDB = require("./config/db");

const app = express();

app.use(express.json());

app.use(cors());
app.use(helmet());

connDB();

app.get("/", (req, res) => {
  res.status(200).json({ message: "Welcome to Apex-farms 😊" });
});

port = process.env.PORT;

app.listen(port, () => console.log(`Server up and running on ${port} 🚀🚀🚀`));
