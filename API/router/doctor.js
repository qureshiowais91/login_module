const express = require("express");
const router = express.Router();
const { profiles, profile } = require("../controller/user");
const { protect, authorize } = require('../middleware/auth');

router
    .route("/profiles/")
    .get(profiles);

router
    .route('/profile')
    .put(protect, authorize('doctor'), profile);

module.exports = router;