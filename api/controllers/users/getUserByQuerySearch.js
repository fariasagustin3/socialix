const User = require("../../models/User")

const getUserByQuerySearch = async(req, res) => {
  try {
    const users = await User.find({ username: {
      $regex: "^" + req.query.username + ".*",
      $options: "i",
    }}).exec();
    if(users) {
      return res.status(200).json(users);
    } else {
      return res.status(200).json({ message: "User not found" })
    }
  } catch(err) {
    console.log(err)
    res.status(500).json(err);
  }
}

module.exports = getUserByQuerySearch;
