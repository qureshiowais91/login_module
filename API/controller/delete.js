const appoinment = require("../model/appoinment");
const doctor = require("../model/doctor");
const patient = require("../model/patient");
const pharmacy = require("../model/pharmacy");
const laboratory = require("../model/laboratory");
const drug = require("../model/drug");
const test = require("../model/test");

const ErrorResponse = require("../utils/errorResponse");

exports.deleteAppoinment = async (req, res, next) => {
    try {
        const deletedAppoinment = await appoinment.findOneAndDelete(req.body);
        if (!deletedAppoinment) {
            throw new ErrorResponse("Document May Not Exist", 404);
        }

        res
            .status(200)
            .json({
                success: true,
                deletedDocument: deletedAppoinment
            });
    } catch (error) {
        next(error);
    }
}

exports.deleteUser = async (req, res, next) => {
    try {
        switch (req.body.role) {
            case process.env.Doctor:
                account = await doctor.findOneAndDelete(req.body);
                break;
            case process.env.Pharmacy:
                account = await pharmacy.findOneAndDelete(req.body);
                break;
            case process.env.Patient:
                account = await patient.findOneAndDelete(req.body);
                break;
            case process.env.Laboratory:
                account = await laboratory.findByIdAndDelete(req.body);
                break;
            default:
                throw new ErrorResponse("Invalid Role", 403)
        }

        res
            .status(200)
            .json({
                success: true,
                data: account
            })
    } catch (error) {
        next(error);
    }
}


exports.deleteDrug = async (req, res, next) => {
    try {
        const deletedDrug = await drug.findByIdAndDelete(req.body);
        if (!deletedDrug) {
            throw new ErrorResponse("Drug Might Not Deleted", 300);
        }

        res
            .status(200)
            .json({
                success: true,
                data: deletedDrug
            });

    } catch (error) {
        next(error);
    }
}


exports.deleteTest = async (req, res, next) => {
    try {
        const deletedTest = await test.findByIdAndDelete(req.body);
        if (!deletedTest) {
            throw new ErrorResponse("Drug Might Not Deleted", 300);
        }

        res
            .status(200)
            .json({
                success: true,
                data: deletedTest
            });

    } catch (error) {
        next(error);
    }
}