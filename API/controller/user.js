const user = require("../model/user");

// custome class that send error Object to error middleware
const ErrorResponse = require("../utils/errorResponse");

exports.profiles = async (req, res, next) => {
    try {

        let profiles = await user.find(req.body);

        if (!profiles) {
            throw new ErrorResponse(`Unable to Access Account info`, 403);
        }

        res.status(200).json({
            success: true,
            data: profiles
        });
    } catch (error) {
        next(error)
    }
}
// update  user's  profile
exports.profile = async (req, res, next) => {
    try {

        let updatedUser = await user
            .findOneAndUpdate({ _id: req.user._id }, { profile: req.body }, { new: true });

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


