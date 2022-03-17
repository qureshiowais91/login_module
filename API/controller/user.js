const { user } = require("../model/user");

// custome class that send error Object to error middleware
const ErrorResponse = require("../utils/errorResponse");

exports.accounts = async (req, res, next) => {
    try {

        let accounts = await user.find(req.body);

        if (!accounts) {
            throw new ErrorResponse(`Unable to Access Account info`, 403);
        }

        res.status(200).json({
            success: true,
            data: accounts
        });
    } catch (error) {
        next(error)
    }
}
// update  user's  accoun
exports.account = async (req, res, next) => {
    try {
        console.log(req.user._id);
        console.log(req.body);

        const userUpdated = await user.updateOne({ id: req.user._id }, { profile: req.body });

        if (!userUpdated) {
            throw new ErrorResponse("Unable to Update user", 500);
        }

        const UpdatedUser = await user.findById(req.user._id);
        // console.log(`found user ${foundUser}`);
        // console.log(`updated user ${updatedUser}`);
        // console.log(`username ${username}`);

        if (!UpdatedUser) {
            throw new ErrorResponse("Unable to Update user", 500);
        }
        res
            .status(200)
            .json({
                success: true,
                data: UpdatedUser
            });
    } catch (error) {
        next(error);
    }
}


