const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const user = mongoose.Schema({
    username: {
        type: String,
        unique: true
    },
    password: {
        type: String,
        required: [true],
        minlength: [4],
        select: false
    },
    role: {
        type: String,
        enum: ['doctor', 'patient'],
        default: 'patient'
    }
});

user.pre("save", async function (next) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
})

module.exports = mongoose.model("user", user);

// register.pre(save, async (next) => {
//     const salt = await bcrypt.genSalt(10);
//     this.password = await bcrypt.hash(this.password);
// })

// user.methods.getsigntoken = function () {
//     return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
//         expiresIn: process.env.JWT_EXPIRE
//     });
// }

// user.methods.matchpassword = function (enterPassword) {
//     return bcrypt.compare(enterPassword, this.password);
// }
