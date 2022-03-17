const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const { isEmail } = require("validator");

const doctorSchema = mongoose.Schema({
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
    },
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


doctorSchema.pre("save", async function (next) {
    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
    } catch (error) {
        next(error);
    }
})


const doctor = mongoose.model("Doctor", doctorSchema);
module.exports = doctor;



