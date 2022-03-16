const express = require("express");
const router = express.Router();

const { createDoctor } = require("../controller/doctor");
const { protect, authorize } = require("../middleware/auth");


router
    .route("/account")
    .post(protect, createDoctor);

module.exports = router;