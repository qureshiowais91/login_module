const jwt = require('jsonwebtoken');
const ErrorResponse = require('../utils/errorResponse');

const doctor = require("../model/doctor");
const patient = require("../model/patient");
const pharmacy = require('../model/pharmacy');
const laboratory = require('../model/laboratory');

exports.protect = async (req, res, next) => {
    let token;

    if (req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        token = req.headers.authorization.split(' ')[1];
    }

    try {
        if (!token) {
            throw new ErrorResponse(`Unauthorize Access`, 403);
        }
        let decoded = jwt.verify(token, process.env.JWT_SECRET);
        try {
            
            const foundDoctor = await doctor.findById(decoded.id);
            const foundPatient = await patient.findById(decoded.id);
            const foundPharmacy = await pharmacy.findById(decoded.id);
            const foundLab = await laboratory.findById(decoded.id);

            if (foundDoctor) {
                req.user = foundDoctor;
                next();
            } else if (foundPatient) {
                req.user = foundPatient;
                next();
            } else if (foundPharmacy) {
                req.user = foundPharmacy;
                next();
            } else if (foundLab) {
                req.user = foundLab;
                next();
            }

            if (!req.user) {
                throw new ErrorResponse("User Not Found", 500);
            }
        } catch (error) {
            next(error);
        }
    } catch (error) {
        next(error);
    }
}

exports.authorize = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return next(new ErrorResponse(`Unauthorize Access Middleware ${req.user.role}`, 500));
        }
        else {
            next();
        }
    }
}