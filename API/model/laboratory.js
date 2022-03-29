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
    },
    order: {
        patient: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Patient",
            require: true
        },
        time: {
            type: Date
        },
        completed: {
            type: String
        }
    }
});


module.exports = mongoose.model("Laboratory", laboratorySchema);
