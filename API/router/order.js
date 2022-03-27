const express = require("express");
const router = express.Router();

const { insertAppoinment } = require("../controller/insert");
const { appoinmentOrder } = require("../controller/find");
const { completedAppoinment, testDrugOrder } = require("../controller/update");
const { deleteOrder } = require("../controller/delete");

router
    .route("/insertAppoinment")
    .post(insertAppoinment);

router
    .route("/appoinmentCartDetls")
    .post(appoinmentOrder);

router
    .route("/update")
    .post(completedAppoinment);

router
    .route("/insertTestdrug")
    .post(testDrugOrder);

router
    .route("/delete")
    .post(deleteOrder);
module.exports = router

