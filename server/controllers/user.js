const bcrypt = require("bcrypt");
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

module.exports = { signup };
