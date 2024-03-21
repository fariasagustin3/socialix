const createConversation = require("../controllers/conversations/createConversation");
const getConversationOfAUser = require("../controllers/conversations/getConversationOfAUser");

const router = require("express").Router();

// new conversation
router.post("/" , createConversation)

// get conversation of a user
router.get("/:userId", getConversationOfAUser)

module.exports = router;
