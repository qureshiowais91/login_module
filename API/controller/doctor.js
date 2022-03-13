const user = require("../model/user");

//  /api/doctor/account
//  POST
//  return account detailsexports.allaccounts = async (req, res, next) => {

    const result = await user.find(req.body);

    res.status(200).json({
        success: true,
        result: result
    });
    next();
}