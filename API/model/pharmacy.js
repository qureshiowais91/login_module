const mongoose = require("mongoose");

const pharmacySchema = mongoose.Schema({
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
        city: {
            type: String
        },
        state: {
            type: String
        }
    },
});

module.exports = mongoose.model("Pharmacy", pharmacySchema);


