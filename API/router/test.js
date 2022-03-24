const express = require("express");
const router = express.Router();

const { insertTest } = require("../controller/insert");
const { findTest } = require("../controller/find");
const { updateTest } = require("../controller/update");

router
    .route("/find")
    .post(findTest);

router
    .route("/insert")
    .post( insertTest);

router
    .route("/update")
    .post(updateTest);

// router
//     .route("/deleteByName")
//     .post(protect, deleteDrug);


module.exports = router