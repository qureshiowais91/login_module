const jwt = require("jsonwebtoken");

exports.createToken = (account) => {
    return jwt.sign({ id: account._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE
    });
}

// check special char in input
exports.escapeRegExp = (string) => {
    return string.replace(/[.*+?^${}()|[\]\\]/g, ' ');
}