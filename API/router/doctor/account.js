const express = require("express");
const router = express.Router();
const { account, allaccounts, removeaccount } = require("../../controller/doctor");
const { protect } = require('../../middleware/auth');

router
    .route("/account/")
    .post(account)
    .get(protect, allaccounts)

router
    .route('/account/:id')
    .delete(removeaccount);

module.exports = router;
