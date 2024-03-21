const Conversation = require("../../models/Conversation")

const getConversationOfAUser = async (req, res) => {
  try {
    const conversation = await Conversation.find({
      members: { $in: [req.params.userId] }
    })

    res.status(200).json(conversation)
  } catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
}

module.exports = getConversationOfAUser
