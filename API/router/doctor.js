const express = require("express");
const router = express.Router();
const {
    register,
    login,
    updateAccountDtls
} = require("../../controller/doctor");


// auth
router
    .route("/register")
    .post(register);

router
    .route("/login")
    .post(login);


// update

router
    .route("/account")
    .put(updateAccountDtls);

module.exports = router;
