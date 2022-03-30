const express = require("express");
const { deleteOrder } = require("../controller/delete");
const { insertOrder } = require("../controller/insert");
const {updateOrder} =require("../controller/update");
const {findOrder}  = require("../controller/find");

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
    .post(findOrder);
module.exports = router