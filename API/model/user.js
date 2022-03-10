const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


const user = mongoose.Schema({
    username: String,
    password: String,
    role: {
        type: String,
        enum: ["doctor", "patient"],
        default: "patient"
    }
});

user.pre("save", async function (next) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
})

user.methods.getsigntoken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE
    });
}

user.methods.matchpassword = function (enterPassword) {
    return bcrypt.compare(enterPassword, this.password);
}

module.exports = mongoose.model("user", user);
