const express = require("express");
const router = express.Router();
const { account, allaccounts, removeaccount } = require("../../controller/doctor");
const { protect } = require('../../middleware/auth');

router
    .route("/account/")
    .get(allaccounts);


module.exports = router;
