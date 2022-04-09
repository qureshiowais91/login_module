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
    drug: [{
        type: String
    }],
    test: [{
        type: String
    }],
    report: [{
        laboratory_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Laboratory"
        },
        field1: {
            type: String
        },
        field2: {
            type: String
        },
        field3: {
            type: String
        }
    }],
    time: {
        type: Date
    },
    completed: {
        type: Boolean
    }
});

module.exports = mongoose.model("Appoinment", appoinmentSchema);
