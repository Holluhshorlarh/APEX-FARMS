const isAuth = (req, res, next) => {
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
