const Conversation = require("../../models/Conversation")

const createConversation = async (req, res) => {
  const newConversation = new Conversation({
    members: [
      req.body.senderId,
      req.body.receiverId
    ]
  });

  try {
    const conversationSaved = await newConversation.save();
    res.status(200).json(conversationSaved)
  } catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
}

module.exports = createConversation