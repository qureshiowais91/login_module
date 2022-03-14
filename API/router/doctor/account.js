const express = require("express");
const router = express.Router();
const { allaccounts, profile } = require("../../controller/doctor");
const { protect, authorize } = require('../../middleware/auth');

router
    .route("/account/")
    .get(allaccounts);

router
    .route('/profile')
    .put(protect,authorize('doctor'), profile);

module.exports = router;