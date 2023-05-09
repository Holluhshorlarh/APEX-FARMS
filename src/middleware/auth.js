const jwt = require("jsonwebtoken");

exports.isAuth = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    if (!token)
      return res.status(401).json({ message: "Authentication failed" });

    const decodeToken = jwt.verify(token, process.env.JWT_SECRET);
    if (!decodeToken)
      return res.status(401).json({ message: "Authentication failed" });

    req.user = decodeToken;
    next();
  } catch (error) {
    return res
      .status(401)
      .json({ error: error.message, message: "Authentication failed" });
  }
};

exports.isAdmin = (req, res, next) => {
  try {
    if (req.user.roles !== "admin")
      return res
        .status(403)
        .json({ message: "Oops sorry you're not an admin" });
    next();
  } catch (error) {
    return res
      .status(403)
      .json({ error: error.mesage, message: "Authentication failed" });
  }
};
