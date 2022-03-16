const mongoose = require("mongoose");
const doctor = require("./doctor");
const user = require("./user");

const patientSchema = mongoose.Schema({
    profile_id: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
    cart: {
        appoinment: {
            doctor_id: { type: mongoose.Schema.Types.ObjectId, ref: "doctor" },
            time: {
                type: Date
            },
            fees: {
                type: Number
            }
        },
    }
});

module.exports = mongoose.model('patient', patientSchema);




