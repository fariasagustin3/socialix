const router = require("express").Router();
const getAllUsers = require("../controllers/users/getAllUsers");
const updateUser = require("../controllers/users/updateUser");
const deleteUser = require("../controllers/users/deleteUser");
const getUserByUsername = require("../controllers/users/getUserByUsername");
const getFriends = require("../controllers/users/getFriends");
const followUser = require("../controllers/users/followUser");
const unfollowUser = require("../controllers/users/unfollowUser");

// get all users route
router.get("/list", getAllUsers);

// update an user route
router.put("/:id", updateUser);

// delete an user route
router.delete("/:id", deleteUser);

// get a single user route
router.get("/", getUserByUsername);

// get friends
router.get("/friends/:userId", getFriends);

// follow an user route
router.put("/:id/follow", followUser);

// unfollow an user route
router.put("/:id/unfollow", unfollowUser);

module.exports = router;
