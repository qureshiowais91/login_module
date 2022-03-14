const jwt = require('jsonwebtoken');
const user = require('../model/user');
const ErrorResponse = require('../utils/errorResponse');
exports.protect = async (req, res, next) => {
    let token;

    if (req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        // split Bearer token in to array and get index 1
        token = req.headers.authorization.split(' ')[1];
    }
    // else if(req.cookies.token){
    //     token=req.cookies.token;
    // }

    try {
        if (!token) {
            throw new ErrorResponse(`Unauthorize Access`, 403);
        }
        let decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log(decoded);
        req.user = await user.findById(decoded.id);
        next();
    } catch (error) {
        next(error);
    }

}

exports.authorize = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return next(new ErrorResponse(`Unauthorize Access`,500));
        }
        else {
            next();
        }
    }
}