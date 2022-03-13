const express = require("express");
const router = express.Router();
const { register, login } = require("../controller/auth");
const { account } = require("../controller/doctor");

router
    .route("/register")
    .post(register);

router
    .route("/login")
    .post(login);

router
    .route("/account:id")
    .post(account);

module.exports = router;
