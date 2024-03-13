const router = require("express").Router();
const login = require("../controllers/auth/login");
const register = require("../controllers/auth/register");

// register new users route
router.post("/register", register);

// login users route
router.post("/login", login);

module.exports = router;