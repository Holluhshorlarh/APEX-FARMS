exports.validateSignup = (req, res, next) => {
  const { firstname, lastname, email, password } = req.body;

  switch (true) {
    case !firstname:
      return res.status(400).json({ message: "First name is required" });
    case !lastname:
      return res.status(400).json({ message: "Last name is required" });
    case !email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email):
      return res.status(400).json({ message: "Enter a valid email address" });
    case !password || password.length < 5:
      return res
        .status(400)
        .json({ message: "password must be greater 5 characters" });
    default:
      next();
  }
};

exports.validateLogin = (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ message: "Enter a valid email address" });
  } else if (!password || password.length < 5) {
    return res
      .status(400)
      .json({ message: "password must be greater 5 characters" });
  } else {
    next();
  }
};

exports.validateAddProducts = (req, res, next) => {};