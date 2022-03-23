const express = require("express");
const router = express.Router();

const { insertDrug } = require("../controller/insert");
const { findDrug } = require("../controller/find");
const { updateDrug } = require("../controller/update");
// const { deleteDrug } = require("../controller/delete");

const { protect } = require("../middleware/auth");

router
    .route("/findDrug")
    .post(protect, findDrug);

router
    .route("/insert")
    .post(protect, insertDrug);

router
    .route("/update")
    .post(protect, updateDrug);

// router
//     .route("/deleteByName")
//     .post(protect, deleteDrug);

    
module.exports = router