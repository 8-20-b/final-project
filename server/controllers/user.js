const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models").User;

const signup = (req, res) => {
  const { email, password } = req.body;

  User.findOne({ where: { email } }).then(user => {
    if (user === null) {
      bcrypt.hash(String(password), 10, (error, hash) => {
        if (error) {
          res.json({
            success: false,
            message: `Something went wrong: ${error}`
          });
        } else {
          User.create({ email, password: hash }).then(newUser =>
            res.json(newUser)
          );
        }
      });
    } else {
      res.json({ success: false, message: "Your email is already in use." });
    }
  });
};

const auth = (req, res) => {
  const { email, password } = req.body;

  User.findOne({ where: { email } })
    .then(user => {
      if (user !== null) {
        bcrypt.compare(String(password), user.password, (err, result) => {
          if (result) {
            const token = jwt.sign(
              { userId: user.userId, email: user.email },
              process.env.JWT_ENCRYPTION,
              {
                expiresIn: process.env.JWT_EXPIRATION
              }
            );

            res.json({ success: true, token });
          } else {
            res.json({ success: false, message: "Invalid password" });
          }
        });
      } else {
        res.json({
          success: false,
          message: "No users found with that email."
        });
      }
    })
    .catch(err => console.log("Error:", err));
};

module.exports = { signup, auth };
