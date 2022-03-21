const mongoose = require("mongoose");

const medicalSchema = mongoose.Schema({
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
        default: "medical"
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
    address: {
        city:{
            String
        },
        state:{
            String
        }
    }
});

module.exports = mongoose.model("Medical", medicalSchema);


