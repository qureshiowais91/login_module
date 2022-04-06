const express = require("express");
const router = express.Router();

const {
    findByUsername,
    findByFullname,
    findByCity,
    findBySpeciality,
} = require("../controller/find");

const { updateAccountDetls } = require("../controller/update");
const { protect, authorize } = require("../middleware/auth");


router
    .route("/update")
    .put(protect, authorize("doctor", "patient", "medical", "laboratory"), updateAccountDetls);

//login/register handled in auth.js route 

// find by fullname
router
    .route("/findByUsername")
    .post(findByUsername);

router
    .route("/findByFullname")
    .post(findByFullname);

router
    .route("/findBycity")
    .post(findByCity);

router
    .route("/findSpeciality")
    .post(findBySpeciality);

module.exports = router;