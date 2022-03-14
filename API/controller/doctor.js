const user = require("../model/user");

// custome class that send error Object to error middleware
const ErrorResponse = require("../utils/errorResponse");
//  /api/doctor/account
//  POST
//  return account details

exports.allaccounts = async (req, res, next) => {
    try {

        const accounts = await user.find(req.body);

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
        const { username } = req.params;
        let foundUser = await user.findOneAndUpdate( username , { profile: req.body },{
            new:true,
            runValidators:true
        });

        if (!foundUser) {
            throw new ErrorResponse(`Username not Found`, 404);
        } else {

            res
                .status(200)
                .json({
                    success: true,
                    user:foundUser
                });

        }

    } catch (error) {
        next(error);
    }
}
