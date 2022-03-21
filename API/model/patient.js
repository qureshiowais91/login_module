const mongoose = require("mongoose");

const patientSchema = mongoose.Schema({
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
        default: "patient"
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
        type: String,
        MIN: [10],
        MAX: [100]
    }
});

module.exports = mongoose.model("Patient", patientSchema);


// address:{
//     addr1
//     city
//     state
// }


