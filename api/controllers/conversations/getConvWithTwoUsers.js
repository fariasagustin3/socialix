const Conversation = require("../../models/Conversation");

const getTwoConv = async (req, res) => {
  try {
    const conversation = await Conversation.findOne({
      members: { $all: [req.params.firstUserId, req.params.secondUserId] },
    });
    res.status(200).json(conversation)
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

module.exports = getTwoConv;
