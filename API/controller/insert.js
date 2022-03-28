const order = require("../model/order");
const drug = require("../model/drug");
const test = require("../model/test");

const ErrorResponse = require("../utils/errorResponse");

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
            level } = req.body;

        const addedDrug = await drug.create({
            addedBy,
            drugName,
            company,
            price,
            power,
            level
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
            testName,
            price,
        } = req.body;

        const addedTest = await test.create({
            addedBy,
            testName,
            price,
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

exports.insertAppoinment = async (req, res, next) => {
    try {

        const {
            orderBy,
            appoinmentWith,
            fees,
            time,
            completed
        } = req.body

        const newAppoinment = await order.create({
            orderBy,
            appoinmentWith,
            fees,
            time,
            completed
        });

        if (!newAppoinment) {
            throw new ErrorResponse("Appoinment Not Created", 400);
        }

        res
            .status(200)
            .json({
                success: true,
                data: newAppoinment
            });
            
    } catch (error) {
        next(error);
    }
}

