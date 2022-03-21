const mongoose = require("mongoose");

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
        default: 'doctor'
    },
    fullname: {
        type: String,       
        MIN: [3],
        MAX: [100]
    },
    email: {
        type: String,
    },
    mobile: {
        type: String,
    },
    birthdate: {
        type: Date
    },
    address: {
        city:{
           type:String
        },
        state:{
            type:String
        }
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




module.exports = mongoose.model("Doctor", doctorSchema);
