const express = require("express");
const router = express.Router();

const { updateAccountDetls } = require("../controller/update");
const { protect, authorize } = require("../middleware/auth");
const {
    findByUsername,
    findByFullname,
    findByCity,
    findBySpeciality
} = require("../controller/find");

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
// find by username
// find by addr city
module.exports = router;

// user/orders/
// POST 
    // by date

// user/order/patient:id
// POST
    //

// user/medical:id/Order
    // POST
    // <return Full Order Details>


