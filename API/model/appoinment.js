const { mongoose } = require("mongoose")

const appoinmentSchema = mongoose.Schema({
    doctor_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Doctor",
        require: true
    },
    patient_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Patient",
        require: true
    },
    time: {
        type: Date
    },
    completed: {
        type: Boolean
    }
});

module.exports = mongoose.model("Appoinment", appoinmentSchema);
