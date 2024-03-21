const Message = require("../../models/Message")

const getMessages = async (req, res) => {
  try {
    const messages = await Message.find({
      conversationId: req.params.conversationId
    })

    res.status(200).json(messages);
  } catch(err) {
    console.log(err)
    res.status(500).json(err)
  }
}

module.exports = getMessages;
