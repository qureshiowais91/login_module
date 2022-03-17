const {doctor} = require("../model/user");
const mongoose =require("mongoose");

// custom class that send error Object to error middleware
const ErrorResponse = require("../utils/errorResponse");

// only accesible by Docters
//api/docter/account
//PUT
exports.createDoctor = async (req, res, next) => {
    try {

        console.log(req.user);
        console.log(req.body);

        if (!req.user._id && !req.body) {
            throw new ErrorResponse(`Missing:Request Body or Token`, 500);
        }

        let user_id = mongoose.Types.ObjectId(req.user._id);

        let {
            speciality,
            fees,
            opentime,
            closetime,
        } = req.body;

        let updateDocter = await doctor.create({
            user_id, speciality, fees, opentime, closetime
        });

        if (!updateDocter) {
            throw new ErrorResponse(`Unable to Update, ROLE:Docter`, 500);
        }

        res.status(201).json({
            success: true,
            data: updateDocter,
        });
    } catch (error) {
        next(error)
    }
}

// "speciality": "MBBS",
//         "fees": 500,
//         "opentime": "1970-01-20T01:37:26.018Z",
//         "closetime": "1970-01-20T01:37:26.018Z",


exports.showDocters = async (req, res, next) => {
    try {
        const found = await doctor.find({}).populate({path:"user_id"});

        res
            .status(200)
            .json({
                success: true,
                data: found
            })
    } catch (error) {
        next(error);
    }
}