// const { create } = require("../model/doctors/doctor");
const doctor = require("../model/doctor");
const patient = require("../model/patient");
const pharmacy = require("../model/pharmacy");
const laboratory = require("../model/laboratory");
const drug = require("../model/drug");
const test = require("../model/test");
// custome class that send error Object to error middleware
const ErrorResponse = require("../utils/errorResponse");
const appoinmentOrder = require("../model/appoinmentOrder");

// update account details based on roles
exports.updateAccountDetls = async (req, res, next) => {
    try {
        let accountUpdateStatus;
        // Check Role of in Comming request
        switch (req.body.role) {
            case process.env.Doctor:
                accountUpdateStatus = await doctor.findByIdAndUpdate({ _id: req.user._id }, req.body, { new: true });
                break;
            case process.env.Pharmacy:
                accountUpdateStatus = await pharmacy.findByIdAndUpdate({ _id: req.user._id }, req.body, { new: true });
                break;
            case process.env.Patient:
                accountUpdateStatus = await patient.findByIdAndUpdate({ _id: req.user._id }, req.body, { new: true });
                break;
            case process.env.Laboratory:
                accountUpdateStatus = await laboratory.findByIdAndUpdate({ _id: req.user._id }, req.body, { new: true })
                break;
            default:
                throw new ErrorResponse("Invalid Role", 403)
        }

        if (!accountUpdateStatus) {
            throw new ErrorResponse(`Unable to Update :${req.user.role}`, 400);
        }

        accountUpdateStatus.save();
        res
            .status(203)
            .json({
                succes: true,
                data: accountUpdateStatus
            });

    } catch (error) {
        next(error);
    }
}
exports.updateDrug = async (req, res, next) => {
    try {
        const updatedDrug = await drug.findByIdAndUpdate({ _id: req.body._id }, req.body, { new: true });

        if (!updatedDrug) {
            throw new ErrorResponse("Drug Details Faild to Update , Function : updateDrug line 52", 500);
        }
        res
            .status(201)
            .json({
                succes: true,
                updatedDrug
            });

    } catch (error) {
        next(error);
    }
}

exports.updateTest = async (req, res, next) => {
    try {

        const updatedTest = await test.findByIdAndUpdate({ _id: req.body._id }, req.body, { new: true });

        if (!updatedTest) {
            throw new ErrorResponse("Test Details Faild to Update", 400);
        }
        res
            .status(201)
            .json({
                succes: true,
                updatedDrug
            });

    } catch (error) {
        next(error);
    }
}

exports.completedAppoinment = async (req, res, next) => {
    try {
        const completedAppoinmentdtls = await appoinmentOrder
            .findOneAndUpdate(
                { orderBy: req.body.orderBy },
                 req.body.completedAppoinment,
                { new: true });

        if (!completedAppoinmentdtls) {
            throw new ErrorResponse("Could Not Update", 300);
        }

        res
            .status(203)
            .json({
                succes: true,
                data: completedAppoinmentdtls
            });
    } catch (error) {
        next(error);
    }
}


exports.testDrugOrder = async (req, res, next) => {
    try {
        const order = await appoinmentOrder.findOneAndUpdate(
             req.body.orderBy ,
            {
                $push: {
                    drug: req.body.drug,
                    test: req.body.test
                }
            },{new:true})

        res.status(203).json({
            succes: true,
            data: order
        })

    } catch (error) {
        next(error);
    }
}