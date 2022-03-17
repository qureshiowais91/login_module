const express = require("express");
const router = express.Router();
const { accounts, account } = require("../controller/user");
const { protect, authorize } = require('../middleware/auth');

router
    .route("/accounts")
    .get(accounts);

router
    .route('/account')
    .put(protect,account);

module.exports = router;