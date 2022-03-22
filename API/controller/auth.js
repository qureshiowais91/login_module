// const { create } = require("../model/doctors/doctor");
const bcrypt = require("bcryptjs");
const doctor = require("../model/doctor");
const patient = require("../model/patient");
const medical = require("../model/medical");
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
            case process.env.Medical:
                account = await medical.create(req.body);
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
        const token = createToken(account);

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
            case process.env.Medical:
                account = await medical.findOne({ username }).select('+password');
                break;
            case process.env.Laboratory:
                account = await laboratory.findOne({ username }).select('+password');
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
        
        const account = await user.find(req.user._id);

        if (!userFound) {
            throw new ErrorResponse("User Not Found", 404);
        }

        res.status(200).json({
            success: true,
            account,
        })
    } catch (error) {
        next(error);
    }
}

exports.logout = (req, res, next) => {
    try {
        res
            .status(200)
            .cookie("token", "", { maxAge: 100*100 })
            .json({
                success:true,
                token:"logout"
            })
    } catch (error) {
        next(error);
    }
}