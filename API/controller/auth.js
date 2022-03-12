// const { create } = require("../model/users/user");
const bcrypt = require("bcryptjs");
const user = require("../model/user");
const jwt = require("jsonwebtoken");
// Register User
exports.register = async (req, res, next) => {

    const result = await user.create(req.body);

    if (req.body.username !== '' && req.body.password !== '') {
        // console.log(req.body);
        try {
            const token = jwt.sign({ id: result._id }, process.env.JWT_SECRET, {
                expiresIn: process.env.JWT_EXPIRE
            });

            res.status(201).json({
                success: true,
                token
            });
        } catch (error) {
            console.log(error);
        }
    } else {
        res.status(400).json({
            success: false,
            msg: "Bad Request"
        });
    }
}

exports.login = async (req, res, next) => {

    const { username, password } = req.body;
    console.log(username, password);
    // validation of data
    if (!username || !password) {
        console.error("enter Correct username password");
    }

    const result = await user.findOne({ username });

    if (result && (await bcrypt.compare(password, result.password))) {

        const token = jwt.sign({ id: result._id }, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRE
        });

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
    } else {
        res.status(500).json({
            success: false
        })
    }

}

exports.registerUser = async (req, res, next) => {

    const result = await user.find(req.body);

    res.status(200).json({
        success: true,
        result: result
    });
}