const express = require("express");

const { validateSignup } = require("../middleware/validate");

const router = express.Router();

router.post("/user/signup", validateSignup);

module.exports = router;
