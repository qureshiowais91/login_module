const express = require("express");
const router = express.Router();

const { updateAccountDetls } = require("../controller/update");
const { protect, authorize } = require("../middleware/auth");
const { findUser } = require("../controller/find");

//login/register handled in auth.js route 

// find doctor id by fullname
router
    .route("/find")
    .post(findUser);
// find by username
// find by addr city
// 
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


    