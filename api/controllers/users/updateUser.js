const User = require("../../models/User");
const bcrypt = require("bcrypt");

const updateUser = async(req, res) => {
  if (req.body.userId === req.params.id || req.body.isAdmin) {
    if (req.body.password) {
      try {
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(req.body.password, salt);
      } catch (err) {
        return res.status(500).json(err);
      }
    }
    try {
      const newUser = await User.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      });
      console.log("newUser: ", newUser)
      res.status(200).json(newUser);
    } catch (err) {
      return res.status(500).json(err);
    }
  } else {
    return res.status(403).json("You can update only your account!");
  }
}

module.exports = updateUser;