require("dotenv").config();
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");

const userRouter = require("./routes/user.routes");

const app = express();

app.use(express.json());

app.use(cors());
app.use(helmet());

app.get("/", (req, res) => {
  res.status(200).json({ message: "Welcome to Apex-farms 😊" });
});

app.use("/api/v1", userRouter);

port = process.env.PORT;

app.listen(port, () => console.log(`Server up and running on ${port} 🚀🚀🚀`));
