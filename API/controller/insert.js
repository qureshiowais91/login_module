const appoinment = require("../model/appoinment");
const order = require("../model/order");
const drug = require("../model/drug");
const test = require("../model/test");


const ErrorResponse = require("../utils/errorResponse");

exports.insertOrder = async (req, res, next) => {
    try {
        const {
            patient_id,
            appoinment_id,
            drug: [{
                quantity_drug,
            }],
            test: [{
                quantity_test,
            }],
        } = req.body;


        const insertedOrder = await order.create(req.body);
        console.log(req.body);
        if (!insertedOrder) {
            throw new ErrorResponse("Order is not Inserted", 302);
        }
        res
            .status(201)
            .json({
                success: true,
                data: insertedOrder
            })
    } catch (error) {
        next(error);
    }
}


exports.insertAppoinment = async (req, res, next) => {
    try {
        const {
            patient_id,
            doctor_id,
            time,
            completed
        } = req.body;

        const newApponment = await appoinment.create({
            patient_id,
            doctor_id,
            time,
            completed
        });

        if (!newApponment) {
            throw new ErrorResponse("Appoinment Not Created", 304);
        }


        res
            .status(200)
            .json({
                success: true,
                data: newApponment
            })

    } catch (error) {
        next(error);
    }
}

exports.insertDrug = async (req, res, next) => {
    try {
        const addedBy = req.body.addedBy;

        if (!addedBy) {
            throw new ErrorResponse("addedBy id missing", 403);
        }

        const {
            drugName,
            company,
            price,
            power,
            level,
            quantity
        } = req.body;

        const addedDrug = await drug.create({
            addedBy,
            drugName,
            company,
            price,
            power,
            level,
            quantity
        });

        if (!addedDrug) {
            throw new ErrorResponse("Can't Add New Medicin, Function:addMedicinbyPharmacy Line:32", 500);
        }

        res.status(201).json({
            success: true,
            addedDrug
        })
    } catch (error) {
        next(error);
    }
}

exports.insertTest = async (req, res, next) => {
    try {
        const addedBy = req.body.addedBy;

        if (!addedBy) {
            throw new ErrorResponse("addedby id missing", 403);
        }

        const {
            testname,
            price,
        } = req.body;

        const addedTest = await test.create({
            addedBy,
            testname,
            price
        });

        if (!addedTest) {
            throw new ErrorResponse("Can't Add New test,", 400);
        }

        res.status(201).json({
            success: true,
            addedTest
        })
    } catch (error) {
        next(error);
    }
}
