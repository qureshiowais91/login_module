const express = require("express");
const router = express.Router();

const { insertAppoinment } = require("../controller/insert");
const { appoinmentOrder } = require("../controller/find");
const { completedAppoinment, testDrugOrder } = require("../controller/update");
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

    
module.exports = router

