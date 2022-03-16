const mongoose = require("mongoose");
// used in pre
const bcrypt = require("bcryptjs");
const { isEmail } = require("validator");
//api/user/account
const userSchema = mongoose.Schema({
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
        enum: ['doctor', 'patient']
    },
    //api/user/account
    profile: {
        email: {
            type: String,
            validate: [isEmail, 'invalid email']
        },
        mobile: {
            type: String,
            match: /^(\()?\d{3}(\))?(-|\s)?\d{3}(-|\s)\d{4}$/,
            //regex works for the formats (123) 456-7890 or 123-456-7890
        },
        full_name: {
            type: String,
            MIN: [3],
            MAX: [100]
        },
        address: {
            type: String,
            MIN: [10],
            MAX: [100]
        },
        birthdate: {
            type: Date
        }
    },
});

// return
// {
//     success:true,
//     token:
//     id:
//     role:
// }

// doctor's profile
userSchema.pre("save", async function (next) {
    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
    } catch (error) {
        next(error);
    }
})

module.exports = mongoose.model("user", userSchema);

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
