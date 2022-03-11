// const { create } = require("../model/users/doctor");
const bcrypt = require("bcryptjs");
const doctor = require("../model/users/doctor");
// Register User
exports.register = async (req, res, next) => {

    const result = await doctor.create(req.body);
    // console.log(req.body);

    const token = result.getsigntoken();

    res.status(201).json({
        success: true,
        token
    });
}

exports.login = async (req, res, next) => {

    const { username, password } = req.body;
    console.log(username, password);
    // validation of data
    if (!username || !password) {
        console.error("enter Correct username password");
    }

    const result = await doctor.findOne({ username });

    if (result && (await bcrypt.compare(password, result.password))) {

        const token = result.getsigntoken();
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

    const result = await doctor.find(req.body);

    res.status(200).json({
        success: true,
        result: result
    });
}