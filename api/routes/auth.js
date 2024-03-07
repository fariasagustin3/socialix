const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");

// register new users route
router.post("/register", async (req, res) => {
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
});

// login users route
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if(!user) {
      return res.status(404).json({ error: "User not found." })
    } else {
      const validPassword = await bcrypt.compare(req.body.password, user.password);
      if(!validPassword) {
        return res.status(400).json({ error: "Wrong credentials" });
      } else {
        return res.status(200).json(user);
      }
    }
  } catch(err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;