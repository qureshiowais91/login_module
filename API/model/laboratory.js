const mongoose = require("mongoose");

const laboratorySchema = mongoose.Schema({
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
        default: 'laboratory'
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
    city: {
        type: String
    },
    opentime: {
        type: Date,
    },
    closetime: {
        type: Date
    }
});


module.exports = mongoose.model("Laboratory", laboratorySchema);
