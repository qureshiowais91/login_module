const user = require("../model/user");

// custome class that send error Object to error middleware
const ErrorResponse = require("../utils/errorResponse");
//  /api/doctor/account
//  POST
//  return account details

exports.allaccounts = async (req, res, next) => {
    try {

        let accounts = await user.find(req.body);

        if (!accounts) {
            throw new ErrorResponse(`Unable to Access Account info`, 403);
        }

        res.status(200).json({
            success: true,
            result: accounts
        });
    } catch (error) {
        next(error)
    }
}
// update profile in doctor's document
exports.profile = async (req, res, next) => {
    try {

        let updatedUser = await user
            .findOneAndUpdate({ _id: req.user._id }, { profile: req.body },{new:true});

        if (!updatedUser) {
            throw new ErrorResponse('Unable to Update Profile', 500);
        }

        updatedUser = await user.find({ _id: req.user._id });

        if (!updatedUser) {
            throw new ErrorResponse('Unable to Update Profile', 500);
        }
        // console.log(`found user ${foundUser}`);
        // console.log(`updated user ${updatedUser}`);
        // console.log(`username ${username}`);
        console.log(`token ${req.user}`);
        res
            .status(200)
            .json({
                success: true,
                user: updatedUser
            });
    } catch (error) {
        next(error);
    }
}


