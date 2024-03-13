const User = require("../../models/User")
const bcrypt = require("bcrypt")

const login = async (req, res) => {
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
}

module.exports = login