const mongoose = require("mongoose");
// used in pre
const bcrypt = require("bcryptjs");
const { isEmail } = require("validator");
//api/user/account

// user have account ID
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
    profile: {
        fullname: {
            type: String,
            MIN: [3],
            MAX: [100]
        },
        email: {
            type: String,
            validate: [isEmail, 'invalid email']
        },
        mobile: {
            type: String,
            match: /^(\()?\d{3}(\))?(-|\s)?\d{3}(-|\s)\d{4}$/,
            //regex works for the formats (123) 456-7890 or 123-456-7890
        },
        birthdate: {
            type: Date
        },
        address: {
            type: String,
            MIN: [10],
            MAX: [100]
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

userSchema.pre("save", async function (next) {
    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
    } catch (error) {
        next(error);
    }
})

const doctoreSchema = mongoose.Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    speciality: {
        type: String,
    },
    fees: {
        type: Number,
    },
    opentime: {
        type: Date,
    },
    closetime: {
        type: Date
    }
});

const doctor = mongoose.model("Doctor", doctoreSchema);
const user = mongoose.model("User", userSchema);

module.exports = { doctor, user };

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
