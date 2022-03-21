const doctor = require("../model/doctor");
const patient = require("../model/patient");
const medical = require("../model/medical");
const laboratory = require("../model/laboratory");
// custome class that send error Object to error middleware
const ErrorResponse = require("../utils/errorResponse");
const { escapeRegExp } = require("../utils/utilsFunction");

// pass fullname of user and return object
exports.findByFullname = async (req, res, next) => {
    try {
        let userFound = false;
        switch (req.body.role) {
            case process.env.Doctor:
                userFound = await doctor.find({ fullname: new RegExp('^' + escapeRegExp(req.body.fullname) + '$', "i") });
                break;
            case process.env.Medical:
                userFound = await medical.find({ fullname: new RegExp('^' + escapeRegExp(req.body.fullname) + '$', "i") });
                break;
            case process.env.Patient:
                userFound = await patient.find({ fullname: new RegExp('^' + escapeRegExp(req.body.fullname) + '$', "i") });
                break;
            case process.env.Laboratory:
                userFound = await laboratory.find({ fullname: new RegExp('^' + escapeRegExp(req.body.fullname) + '$', "i") });
                break;
            default:
                throw new ErrorResponse("Invalid Role", 403)
        }

        if (!userFound) {
            throw new ErrorResponse("User Not Found", 404);
        }

        res.status(200).json({
            success: true,
            user: userFound
        })
    } catch (error) {
        next(error);
    }
}



exports.findByUsername = async (req, res, next) => {
    try {
        let userFound = false;
        switch (req.body.role) {
            case process.env.Doctor:
                userFound = await doctor.find({ username: new RegExp('^' + escapeRegExp(req.body.username) + '$', "i") });
                break;
            case process.env.Medical:
                userFound = await medical.find({ username: new RegExp('^' + escapeRegExp(req.body.username) + '$', "i") });
                break;
            case process.env.Patient:
                userFound = await patient.find({ username: new RegExp('^' + escapeRegExp(req.body.username) + '$', "i") });
                break;
            case process.env.Laboratory:
                userFound = await laboratory.find({ username: new RegExp('^' + escapeRegExp(req.body.username) + '$', "i") });
                break;
            default:
                throw new ErrorResponse("Invalid Role", 403)
        }

        if (!userFound) {
            throw new ErrorResponse("User Not Found", 404);
        }

        res.status(200).json({
            success: true,
            user: userFound
        })
    } catch (error) {
        next(error);
    }
}


exports.findByCity = async (req, res, next) => {
    try {
        let userFound = false;
        switch (req.body.role) {
            case process.env.Doctor:
                userFound = await doctor.find({ city: new RegExp('^' + escapeRegExp(req.body.city) + '$', "i") });
                break;
            case process.env.Medical:
                userFound = await medical.find({ city: new RegExp('^' + escapeRegExp(req.body.city) + '$', "i") });
                break;
            case process.env.Patient:
                userFound = await patient.find({ city: new RegExp('^' + escapeRegExp(req.body.city) + '$', "i") });
                break;
            case process.env.Laboratory:
                userFound = await laboratory.find({ city: new RegExp('^' + escapeRegExp(req.body.city) + '$', "i") });
                break;
            default:
                throw new ErrorResponse("Invalid Role", 403)
        }

        if (!userFound) {
            throw new ErrorResponse("User Not Found", 404);
        }

        res.status(200).json({
            success: true,
            user: userFound
        })
    } catch (error) {
        next(error);
    }
}



exports.findBySpeciality = async (req, res, next) => {
    try {

        let userFound = false;
        switch (req.body.role) {
            case process.env.Doctor:
                console.log(req.body);
                userFound = await doctor.find({speciality:req.body.speciality});
                break;
            case process.env.Medical:
                userFound = await medical.find({speciality:req.body.speciality});
                break;
            case process.env.Patient:
                userFound = await patient.find({speciality:req.body.speciality});
                break;
            case process.env.Laboratory:
                userFound = await laboratory.find({speciality:req.body.speciality});
                break;
            default:
                throw new ErrorResponse("Invalid Role", 403)
        }

        if (!userFound) {
            throw new ErrorResponse("User Not Found", 404);
        }

        res.status(200).json({
            success: true,
            user: userFound
        })
    } catch (error) {
        next(error);
    }
}
