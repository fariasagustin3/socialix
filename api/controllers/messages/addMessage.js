const Message = require("../../models/Message")

const addMessage = async (req, res) => {
  const newMessage = new Message(req.body);

  try {
    const messageSaved = await newMessage.save()
    res.status(201).json(messageSaved);
  } catch (err) {
    console.log(err)
    res.status(500).json(err);
  }
}

module.exports = addMessage;
