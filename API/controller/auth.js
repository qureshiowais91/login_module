// const { create } = require("../model/users/doctor");
const bcrypt = require("bcryptjs");
const doctor = require("../model/user");
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

// exports.login = async (req, res, next) => {

//     const { username, password, role } = req.body;

//     console.log(username, password, role);
//     // validation of data
//     if (!username || !password) {
//         console.error("User not Found in db");
//     }

//     const result = await doctor.findOne({ username }).select({ password });
//     // console.log(req.body);
//     console.log(result);
//     const isMatch = bcrypt.compare(password, result.password);
//     if (!isMatch) {
//         console.error("Username or Password Mismatch");
//     }
//     const token = result.getsigntoken();

//     res.status(201).json({
//         success: true,
//         token
//     });
// }



exports.registerUser = async (req, res, next) => {

    const result = await doctor.find(req.body);

    res.status(200).json({
        success: true,
        result: result
    });
}