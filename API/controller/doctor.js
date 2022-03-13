const user = require("../model/user");

//  /api/doctor/account
//  POST
//  return account details

exports.allaccounts = async (req, res, next) => {
    try {

        const result = await user.find(req.body);

        res.status(200).json({
            success: true,
            result: result
        });
    } catch (error) {
        res.status(403).json({
            success:false
        })
        console.log(error);
    }
    next();
}
