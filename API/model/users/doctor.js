const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


const doctor = mongoose.Schema({
    username: String,
    password: String

});

// register.pre(save, async (next) => {
//     const salt = await bcrypt.genSalt(10);
//     this.password = await bcrypt.hash(this.password);
// })



doctor.pre("save", async function (next) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    // next();
})


doctor.methods.getsigntoken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE
    });
}


doctor.methods.matchpassword = function (enterPassword) {
    return bcrypt.compare(enterPassword, this.password);
}

module.exports = mongoose.model("doctor", doctor);
