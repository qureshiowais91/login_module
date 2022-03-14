const express = require("express");
const router = express.Router();
const { allaccounts, profile } = require("../../controller/doctor");
const { protect, authorize } = require('../../middleware/auth');

router
    .route("/account/")
    .get(protect, allaccounts);

router
    .route('/profile/:username')
    .put(profile);
    
module.exports = router;
