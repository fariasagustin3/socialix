const createConversation = require("../controllers/conversations/createConversation");
const getTwoConv = require("../controllers/conversations/getConvWithTwoUsers");
const getConversationOfAUser = require("../controllers/conversations/getConversationOfAUser");

const router = require("express").Router();

// new conversation
router.post("/" , createConversation)

// get conversation of a user
router.get("/:userId", getConversationOfAUser)

// get conversations includes two users
router.get("/find/:firstUserId/:secondUserId", getTwoConv);

module.exports = router;
