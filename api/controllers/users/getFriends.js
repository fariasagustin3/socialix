const User = require("../../models/User")

const getFriends = async(req, res) => {
  try {
    const user = await User.findById(req?.params?.userId);
    const friends = await Promise.all(
      user.followings.map((friendId) => {
        return User.findById(friendId);
      })
    );

    let friendList = [];
    friends.map((friend) => {
      const { _id, username, profilePicture } = friend;
      friendList.push({ _id, username, profilePicture });
    });

    res.status(200).json(friendList);
  } catch(err) {
    console.log(err);
    res.status(500).json({ error: err.message })
  }
}

module.exports = getFriends;
