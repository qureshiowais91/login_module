const mongoose = require("mongoose");
// used in pre
const bcrypt = require("bcryptjs");


const profileSchema = mongoose.Schema({
})



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
        String,
        enum: ['doctor', 'patient']
    },
    profile: {
        email: {
            String
        },
        name: {
            String
        },
        address: {
            String
        },
        fees: {
            Number
        }
    }
});
// doctor's profile


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
