const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

const accountVerification = async (req, res) => {
  const { email } = req.body;

  User.findOne({ email: email }, (err, data) => {
    if (err) {
      return res.status(401).send("error getting account");
    }

    if (data) {
      return res.status(200).send({ accountExists: true });
    }
    return res.status(200).send({ accountExists: false });
  });
};

const signup = async (req, res) => {
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 5),
  });

  try {
    const savedUser = await user.save();
    res.json(savedUser);
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).send("user already exists");
    } else {
      return res.status(500).send("error signing up user");
    }
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    User.findOne({ email: email }, (err, data) => {
      if (err) {
        return res.status(401).send("invalid login credentials");
      }

      const { password: userPassword, email: userEmail, name, _id: id } = data;

      let passwordCheck = bcrypt.compareSync(password, userPassword);
      if (!passwordCheck) {
        return res.status(401).send("invalid password");
      }

      const payload = {
        email: userEmail,
        name,
        id,
      };

      let token = jwt.sign(payload, process.env.TOKEN_SECRET);

      return res
        .cookie("access_token", token, {
          httpOnly: true,
        })
        .status(200)
        .send({ token });
    });
  } catch (error) {
    res.status(500).send("server error");
  }
};

module.exports = { signup, login, accountVerification };
