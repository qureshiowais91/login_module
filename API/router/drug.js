const express = require("express");
const router = express.Router();

const { insertDrug } = require("../controller/insert");
const { findDrug } = require("../controller/find");
const { updateDrug } = require("../controller/update");
const { deleteDrug } = require("../controller/delete");

router
    .route("/findDrug")
    .post(findDrug)

router
    .route("/insert")
    .post(insertDrug);

router
    .route("/update")
    .post(updateDrug);

router
    .route("/delete")
    .post(deleteDrug);

module.exports = router
