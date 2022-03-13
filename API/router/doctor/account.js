const express = require("express");
const router = express.Router();
const { allaccounts } = require("../../controller/doctor");
const { protect } = require('../../middleware/auth');

router
    .route("/account/")
    .get(protect,allaccounts);

module.exports = router;
