const addMessage = require("../controllers/messages/addMessage");
const getMessages = require("../controllers/messages/getMessages");

const router = require("express").Router();

// add message
router.post("/", addMessage);

// get messages
router.get("/:conversationId", getMessages);

module.exports = router;
