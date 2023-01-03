require("dotenv").config();
const jwt = require("jsonwebtoken");

const verify = (req, res, next) => {
  const { token } = req.body;

  if (!token) {
    return res.status(403).send("A token is required for authentication");
  }

  jwt.verify(token, process.env.TOKEN_SECRET, (error, decoded) => {
    if (error) res.status(401).send("Invalid Token");
    else next();
  });
};

module.exports = verify;
