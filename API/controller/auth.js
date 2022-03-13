// const { create } = require("../model/users/user");
const bcrypt = require("bcryptjs");
const user = require("../model/user");
const jwt = require("jsonwebtoken");
// Register User

exports.register = async (req, res, next) => {
    console.log(process.env.JWT_SECRET);
    // get account object
    const account = await user.create(req.body);

    // check if it's not empty
    if (req.body.username !== '' && req.body.password !== '') {
        // console.log(req.body);
        try {
            // console.log(process.env.JWT_SECRET);
            // password is hashed in middleware 
            // create signed token
            const token = jwt.sign({ id: account._id }, process.env.JWT_SECRET, {
                expiresIn: process.env.JWT_EXPIRE
            });

            res
                .status(201)
                .json({
                    success: true,
                    token
                });
        } catch (error) {
            console.log(error);
        }
    } else {
        res.status(401).json({
            success: false,
        });
    }
}


exports.login = async (req, res, next) => {
    console.log(process.env.JWT_SECRET);

    const { username, password } = req.body;

    try {
        //find user 
        const account = await user.findOne({ username }).select('+password');
        // check password
        const passwordCheck = await bcrypt.compare(password, account.password);
        // create signed token
        const token = jwt.sign({ id: account._id }, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRE
        });
        // set option for cookie
        const option = {
            expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 24 * 60),
            httpOnly: true
        }

        // if account exist
        if (account) {
            //log account info and password validation
            console.log(account);
            console.log(passwordCheck);
            //password valid or not
            if (passwordCheck) {
                // valid account cred send token
                res
                    .status(200)
                    .cookie('token', token, option)
                    .json({
                        success: true,
                        token
                    })
            } else {
                // password is wrong
                res
                    .status(403)
                    .json({
                        success: false
                    })
            }
        } else {
            // account doesnt exist
            res
                .status(403)
                .json({
                    success: false
                })
        }
    } catch (error) {
        console.log(error);
    }

}