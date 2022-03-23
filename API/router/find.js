const express = require("express");
const router = express.Router();

const {
    findByUsername,
    findByFullname,
    findByCity,
    findBySpeciality,
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

