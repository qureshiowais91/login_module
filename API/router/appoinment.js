const express = require("express");
const router = express.Router();

const { insertAppoinment} = require("../controller/insert");
const { findAppoinment } = require("../controller/find");
const { completedAppoinment } = require("../controller/update");
const { deleteAppoinment } = require("../controller/delete");

router
    .route("/insert")
    .post(insertAppoinment);

router
    .route("/find")
    .post(findAppoinment);

router
    .route("/update")
    .post(completedAppoinment);
    
router
    .route("/delete")
    .post(deleteAppoinment);

module.exports = router

