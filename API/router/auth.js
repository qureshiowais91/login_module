const express = require("express");
const router = express.Router();
// const { register,login } = require("../controller/auth");
const { register } = require("../controller/auth");


// router.post("/register", register).post("/login", login);
router.post("/register", register);

module.exports = router;
