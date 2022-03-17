// const { create } = require("../model/doctors/doctor");
const bcrypt = require("bcryptjs");
const doctor = require("../model/doctor");
const jwt = require("jsonwebtoken");
// custome class that send error Object to error middleware
const ErrorResponse = require("../utils/errorResponse");
// Register doctor

exports.register = async (req, res, next) => {

    try {

        const account = await doctor.create(req.body);
        if (!account) {
            throw new ErrorResponse('Unable to Register', 302);
        }

        const token = jwt.sign({ id: account._id }, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRE
        });
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
        const account = await doctor.findOne({ username }).select('+password');

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
        const token = jwt.sign({ id: account._id }, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRE
        });

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
                token
            })
    } catch (error) {
        next(error);
    }
}

exports.updateAccountDetls = (req, res, next) => {
    try {
        const accountUpdateStatus = await doctor
            .findByIdAndUpdate({ id: req.user._id }, req.body);
            
        if (!accountUpdateStatus) {
            throw new ErrorResponse(`Unable to Update UserId:${req.user._id}`, 400);
        }
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


