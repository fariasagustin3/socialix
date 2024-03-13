const createPost = require("../controllers/posts/createPost");
const deletePost = require("../controllers/posts/deletePost");
const getAllPosts = require("../controllers/posts/getAllPosts");
const getPostById = require("../controllers/posts/getPostById");
const getUserProfile = require("../controllers/posts/getUserProfile");
const manageLikes = require("../controllers/posts/manageLikes");
const timeline = require("../controllers/posts/timeline");
const updatePost = require("../controllers/posts/updatePost");
const uploadImage = require("../controllers/posts/uploadImage");
const Post = require("../models/Post");
const User = require("../models/User");
const upload = require("../multer/multer");

const router = require("express").Router();

// get all posts route
router.get("/list", getAllPosts);

// upload an image to cloudinay and send the url
router.post('/upload', upload.single('file'), uploadImage);

// create a post route
router.post("/", createPost);

// update a post route
router.put("/:id", updatePost);

// delete a post route
router.delete("/:id", deletePost)

// like/dislike a post route
router.put("/:id/like", manageLikes);

// get a single post route
router.get("/:id", getPostById);

// get timeline posts route
router.get("/timeline/:userId", timeline);

// get user profile
router.get("/profile/:username", getUserProfile);

module.exports = router;
