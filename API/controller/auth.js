// const { create } = require("../model/doctors/doctor");
const bcrypt = require("bcryptjs");
const doctor = require("../model/doctor");
const patient = require("../model/patient");
const pharmacy = require("../model/pharmacy");
const laboratory = require("../model/laboratory");
// custome class that send error Object to error middleware
const ErrorResponse = require("../utils/errorResponse");
const { createToken } = require("../utils/utilsFunction");

// Register doctor
exports.register = async (req, res, next) => {

    try {
        let account;

        //hash password
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(req.body.password, salt);

        // Create User by Checking Role
        switch (req.body.role) {
            case process.env.Doctor:
                account = await doctor.create(req.body);
                break;
            case process.env.Pharmacy:
                account = await pharmacy.create(req.body);
                break;
            case process.env.Patient:
                account = await patient.create(req.body);
                break;
            case process.env.Laboratory:
                account = await laboratory.create(req.body);
                break;
            default:
                throw new ErrorResponse("Invalid Role", 403)
        }

        if (!account) {
            throw new ErrorResponse('Unable to Register', 304);
        }

        // create signed token
        // imported from utils
        const token = createToken(account, req.body.role);

        if (!token) {
            throw new ErrorResponse(`Can't Get Account Token`, 302);
        }

        const option = {
            expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 24 * 60),
            httpOnly: true
        }

        res
            .status(201)
            .cookie('token', token, option)
            .json({
                success: true,
                token: token
            });
    } catch (error) {
        next(error);
    }
}

exports.login = async (req, res, next) => {
    try {
        const { username, password } = req.body;
        //find doctor 
        let account = false;

        switch (req.body.role) {
            case process.env.Doctor:
                account = await doctor.findOne({ username }).select('+password');
                break;
            case process.env.Patient:
                account = await patient.findOne({ username }).select('+password');
                break;
            case process.env.Pharmacy:
                account = await pharmacy.findOne({ username }).select('+password');
                break;
            case process.env.Laboratory:
                account = await laboratory.findOne({ username }).select('+password');
                break;
            default:
                throw new ErrorResponse("Invalid Role", 403);
        }

        //account invalid 
        if (!account) {
            throw new ErrorResponse('account Does Not Exist', 403);
        }

        // check password
        const passwordCheck = await bcrypt.compare(password, account.password);

        if (!passwordCheck) {
            throw new ErrorResponse('Invalid username or Password', 403);
        }

        // create signed token
        // imported from utils
        const token = createToken(account);

        // set option for cookie
        const option = {
            expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 24 * 60),
            httpOnly: true
        }

        res
            .status(200)
            .cookie('token', token, option)
            .json({
                success: true,
                token,
                account
            })
    } catch (error) {
        next(error);
    }
}

exports.loggedInUser = async (req, res, next) => {
    try {
        let userFound = false;
        console.log(req.body._id);
        switch (req.body.role) {
            case process.env.Doctor:
                console.log(req.body);
                userFound = await doctor.find({ _id: req.user._id });
                break;
            case process.env.Pharmacy:
                userFound = await pharmacy.find({ _id: req.user._id });
                break;
            case process.env.Patient:
                userFound = await patient.find({ _id: req.user._id });
                break;
            case process.env.Laboratory:
                userFound = await laboratory.find({ _id: req.user._id });
                break;
            default:
                throw new ErrorResponse("Invalid Role", 403)
        }
        if (!userFound) {
            throw new ErrorResponse("User Not Found", 404);
        }

        res.status(200).json({
            success: true,
            account: userFound
        })
    } catch (error) {
        next(error);
    }
}

exports.logout = (req, res, next) => {
    try {
        res
            .status(200)
            .cookie("token", "logout", { maxAge: 100 * 100 })
            .json({
                success: true,
                token: "logout"
            })
    } catch (error) {
        next(error);
    }
}