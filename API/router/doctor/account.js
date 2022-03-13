const express = require("express");
const router = express.Router();
const { allaccounts } = require("../../controller/doctor");
const { protect, authorize } = require('../../middleware/auth');

router
    .route("/account/")
    .get(protect, authorize('patient'), allaccounts);

module.exports = router;
