// const { create } = require("../model/doctors/doctor");
const doctor = require("../model/doctor");
const patient = require("../model/patient");
const medical = require("../model/medical");
const laboratory = require("../model/laboratory");
// custome class that send error Object to error middleware
const ErrorResponse = require("../utils/errorResponse");

// update account details based on roles
exports.updateAccountDetls = async (req, res, next) => {
    try {
        let accountUpdateStatus;
        // Check Role of in Comming request
        switch (req.body.role) {
            case process.env.Doctor:
                accountUpdateStatus = await doctor.findByIdAndUpdate({ _id: req.user._id }, req.body, { new: true });
                break;
            case process.env.Medical:
                accountUpdateStatus = await medical.findByIdAndUpdate({ _id: req.user._id }, req.body, { new: true });
                break;
            case process.env.Patient:
                accountUpdateStatus = await patient.findByIdAndUpdate({ _id: req.user._id }, req.body, { new: true });
                break;
            case process.env.Laboratory:
                accountUpdateStatus = await laboratory.findByIdAndUpdate({ _id: req.user._id }, req.body, { new: true })
                break;
            default:
                throw new ErrorResponse("Invalid Role", 403)
        }

        if (!accountUpdateStatus) {
            throw new ErrorResponse(`Unable to Update :${req.user.role}`, 400);
        }

        accountUpdateStatus.save();
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
