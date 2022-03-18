const jwt = require('jsonwebtoken');
const ErrorResponse = require('../utils/errorResponse');
const doctor = require("../model/doctor");
const patient = require("../model/patient");

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
            console.log(foundPatient);
            console.log(foundDoctor);
            if (foundDoctor) {
               
                req.user = foundDoctor;
                next();
            } else {
               
                req.user = foundPatient;
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