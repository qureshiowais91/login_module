const express = require("express");
const router = express.Router();

const { insertAppoinment } = require("../controller/insert");
const { findAppoinment } = require("../controller/find");
const { completedAppoinment, appoinmentPrescription, appoinmentReport } = require("../controller/update");
const { deleteAppoinment } = require("../controller/delete");
const pagination = require("../middleware/pagination");
const appoinment = require("../model/appoinment");

router
    .route("/insert")
    .post(insertAppoinment);

router
    .route("/find")
    .post(pagination(appoinment), findAppoinment);

router
    .route("/completed")
    .post(completedAppoinment);

router
    .route("/prescription")
    .post(appoinmentPrescription);

router
    .route("/report")
    .post(appoinmentReport);


router
    .route("/delete")
    .post(deleteAppoinment);

module.exports = router

