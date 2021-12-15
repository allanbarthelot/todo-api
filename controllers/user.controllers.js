const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

const me = async (req, res) => {
  console.log("decoded", req.decoded);

  const {
    decoded: { email },
  } = req;

  User.findOne({ email: email }, (err, data) => {
    if (err) {
      return res.status(401).send("user does not exist");
    }

    return res.status(200).json(data);
  });
};

const logout = async (req, res) => {
  res.clearCookie("access_token", { httpOnly: true });
  return res.status(204).send("user logged out");
};

module.exports = { logout, me };
