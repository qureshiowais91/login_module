const order = require("../model/appoinmentOrder");
const doctor = require("../model/doctor");
const patient = require("../model/patient");
const pharmacy = require("../model/pharmacy");
const laboratory = require("../model/laboratory");
const drug = require("../model/drug");

const ErrorResponse = require("../utils/errorResponse");

exports.deleteOrder = async (req, res, next) => {
    try {
        const deletedOrder = await order.findOneAndDelete({ orderBy: req.body.orderBy });
        if (!deletedOrder) {
            throw new ErrorResponse("Delete Not performed", 404);
        }

        res
            .status(200)
            .json({
                success: true,
                data: deletedOrder
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