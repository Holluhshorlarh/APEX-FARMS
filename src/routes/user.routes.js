const express = require("express");

const { validateSignup, validateLogin } = require("../middleware/validate");

const { signUp, login } = require("../controllers/user.controllers");
const router = express.Router();

router.post("/user/signup", validateSignup, signUp);

router.post("/user/login", validateLogin, login);

module.exports = router;
