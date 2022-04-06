const express = require("express");
const { deleteOrder } = require("../controller/delete");
const { insertOrder } = require("../controller/insert");
const {updateOrder} =require("../controller/update");
const {findOrder}  = require("../controller/find");
const pagination = require("../middleware/pagination");
const order = require("../model/order");

const router = express.Router();

router
    .route("/insert")
    .post(insertOrder);


router
    .route("/update")
    .post(updateOrder);


router
    .route("/delete")
    .post(deleteOrder);

router
    .route("/find")
    .post(pagination(order),findOrder);
module.exports = router