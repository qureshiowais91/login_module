const express = require("express");
const { insertOrder } = require("../controller/insert");
const {updateOrder} =require("../controller/update");
const router = express.Router();

router
    .route("/insert")
    .post(insertOrder);


router
    .route("/update")
    .post(updateOrder);


module.exports = router