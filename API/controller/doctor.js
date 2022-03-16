const doctor = require("../model/doctor");

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
       
        
        let userId = req.user._id;

        let {
            speciality,
            fees,
            opentime,
            closetime,
        } = req.body;

        let updateDocter = await doctor.create({
            userId, speciality, fees, opentime, closetime
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

