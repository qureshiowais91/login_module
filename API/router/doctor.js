const express = require("express");
const router = express.Router();

const { createDoctor, showDocters } = require("../controller/doctor");
const { protect, authorize } = require("../middleware/auth");


router
    .route("/account")
    .get(showDocters)
    .post(protect, createDoctor);

module.exports = router;