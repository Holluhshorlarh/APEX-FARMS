const express = require("express");

const { validateSignup } = require("../middleware/validate");

const { signUp } = require("../controllers/user.controllers");
const router = express.Router();

router.post("/user/signup", validateSignup, signUp);

module.exports = router;
