const express = require("express");
const router = express.Router();
const { updateAccountDetls } = require("../controller/update");
const { protect, authorize } = require("../middleware/auth");

//login/register handled in auth.js route 

// update
router
    .route("/update")
    .put(protect, authorize("doctor", "patient"), updateAccountDetls);

module.exports = router;
