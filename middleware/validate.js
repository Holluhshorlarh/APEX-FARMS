exports.validateSignup = (req, res, next) => {
  const { firstName, lastName, email, password } = req.body;

  switch (true) {
    case !firstName:
      return res.status(400).json({ message: "First name is required" });
    case !lastName:
      return res.status(400).json({ message: "Last name is required" });
    case !email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email):
      return res.status(400).json({ message: "Enter a valid email address" });
    case !password || !password < 6:
      return res
        .status(400)
        .json({ message: "password must be greater 5 characters" });
    default:
      next();
  }
};
