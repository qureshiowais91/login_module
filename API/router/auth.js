const express = require("express");
const router = express.Router();
const {
    register,
    login,
    logout,
    loggedInUser
} = require("../controller/auth");


const { deleteUser } = require("../controller/delete");

const { protect } = require("../middleware/auth");
// auth
router
    .route("/register")
    .post(register);

router
    .route("/login")
    .post(login);

router.route("/loggedin")
    .post(protect, loggedInUser);

router
    .route("/logout")
    .get(logout);

router
    .route("/delete")
    .post(deleteUser);

module.exports = router;
