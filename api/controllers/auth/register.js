const User = require("../../models/User")
const bcrypt = require("bcrypt")

const register = async (req, res) => {
  try {
    // generate new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    
    // create a new instance of a new user
    const user = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
    })

    // save user created into db
    const userSaved = await user.save();
    res.status(201).json(userSaved);
  } catch(err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
}

module.exports = register;