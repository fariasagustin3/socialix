const User = require("../../models/User");

const getAllUsers = async(req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch(err) {
    console.log(err);
    res.status(500).json({ error: err.message })
  }
}

module.exports = getAllUsers;
