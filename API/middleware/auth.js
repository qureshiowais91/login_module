const jwt = require('jsonwebtoken');
const user = require('../model/user');

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

    if (!token) {
        return next({ msg: 'not auth', statusCode: 403 });
    }

    try {
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        console.log(decoded);
        req.user = await user.findById(decoded.id);
        next();
    } catch (error) {
        return next({ msg: 'not auth', statusCode: 403 });
    }

}