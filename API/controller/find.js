const doctor = require("../model/doctor");
const patient = require("../model/patient");
const medical = require("../model/medical");
const laboratory = require("../model/laboratory");
// custome class that send error Object to error middleware
const ErrorResponse = require("../utils/errorResponse");
const { escapeRegExp } = require("../utils/utilsFunction");

// pass fullname of user and return object
exports.findUser = async (req, res, next) => {
    try {
        let userFound = false;
        switch (req.body.role) {
            case process.env.Doctor:
                userFound = await doctor.find({ fullname: new RegExp('^' + escapeRegExp(req.body.fullname) + '$', "i") });
                break;
            case process.env.Medical:
                userFound = await medical.find({ fullname: new RegExp('^' + escapeRegExp(req.body.fullname) + '$', "i") });
                break;
            case process.env.Patient:
                userFound = await patient.find({ fullname: new RegExp('^' + escapeRegExp(req.body.fullname) + '$', "i") });
                break;
            case process.env.Laboratory:
                userFound = await laboratory.find({ fullname: new RegExp('^' + escapeRegExp(req.body.fullname) + '$', "i") });
                break;
            default:
                throw new ErrorResponse("Invalid Role", 403)
        }

        if (!userFound) {
            throw new ErrorResponse("User Not Found", 404);
        }

        res.status(200).json({
            success: true,
            user: userFound[0]._id
        })
    } catch (error) {
        next(error);
    }
}


// return all docotor based on 

// exports.findUserbyID = () => {
//     let userFound = false;
//     switch (req.body.role) {
//         case process.env.Doctor:
//             userFound = await doctor.find({ fullname: new RegExp('^' + escapeRegExp(req.body.fullname) + '$', "i") });
//             break;
//         case process.env.Medical:
//             userFound = await medical.find({ fullname: new RegExp('^' + escapeRegExp(req.body.fullname) + '$', "i") });
//             break;
//         case process.env.Patient:
//             userFound = await patient.find({ fullname: new RegExp('^' + escapeRegExp(req.body.fullname) + '$', "i") });
//             break;
//         case process.env.Labs:
//             userFound = await lab.find({ fullname: new RegExp('^' + escapeRegExp(req.body.fullname) + '$', "i") });
//             break;
//         default:
//             throw new ErrorResponse("Invalid User Role", 403)
//     }
// }