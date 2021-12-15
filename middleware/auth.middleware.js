const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  const token = req.cookies.access_token;
  if (!token) {
    return res.status(403).send("no token");
  }

  jwt.verify(token, process.env.TOKEN_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).send("token invalid");
    }
    console.log("decoded", decoded);
    req.decoded = decoded;
    next();
  });
};

module.exports = authMiddleware;
