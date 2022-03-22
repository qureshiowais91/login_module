const express = require("express");
const router = express.Router();
const {
    register,
    login,
    logout,
    loggedInUser
} = require("../controller/auth");
const { protect } = require("../middleware/auth");
// auth
router
    .route("/register")
    .post(register);

router
    .route("/login")
    .post(login);

router.route("/loggedin")
    .post(protect,loggedInUser);

router
    .route("/logout")
    .get(logout);

module.exports = router;
