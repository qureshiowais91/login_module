// const { create } = require("../model/users/user");
const bcrypt = require("bcryptjs");
const user = require("../model/user");
const jwt = require("jsonwebtoken");
// custome class that send error Object to error middleware
const ErrorResponse = require("../utils/errorResponse");
// Register User

exports.register = async (req, res, next) => {

    try {
        const account = await user.create(req.body);
        if (!account) {
            throw new ErrorResponse('Unable to Register', 302);
        }
        console.log(account);   
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
                token
            });
    } catch (error) {
        next(error);
    }
}


exports.login = async (req, res, next) => {
    try {
        const { username, password } = req.body;
        //find user 
        const account = await user.findOne({ username }).select('+password');

        //account invalid 
        if (!account) {
            throw new ErrorResponse('Account Does Not Exist', 403);
        }

        // check password
        const passwordCheck = await bcrypt.compare(password, account.password);

        if (!passwordCheck) {
            throw new ErrorResponse('Invalid Username or Password', 403);
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