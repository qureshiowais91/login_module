const cart = require("../model/cart");
const drug = require("../model/drug");
const test = require("../model/test");

const ErrorResponse = require("../utils/errorResponse");

exports.insertDrug = async (req, res, next) => {
    try {
        const addedBy = req.body.addedBy;

        if (!addedBy) {
            throw new ErrorResponse("addedby id missing", 403);
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


exports.insertCart = async (req, res, next) => {
    try {

        const cartOf = req.body.addedBy;

        const {
            appoinment: {
                appoinmentWith,
                fees,
                time
            },
            drug,
            test
        } = req.body;

        const CartInfo = await cart.find({ cartOf });

        CartInfo.update({
            appoinment: {
                appoinmentWith,
                fees,
                time
            },
            drug,
            test
        });

        CartInfo.save();

        res
            .status(200)
            .json({
                success: true,
                cart: CartInfo
            });

    } catch (error) {
        next(error);
    }
}