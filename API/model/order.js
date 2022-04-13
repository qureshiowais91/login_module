const { mongoose } = require("mongoose")

const orderSchema = mongoose.Schema({
    patient_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Patient",
        require: true
    },
    pharmacy_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Pharmacy"
    },
    laboratory_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Laboratory"
    },
    appoinment_id: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Appoinment"
    }],
    drug_id: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Drug",
        unique: false
    }],
    quantity_drug: [{
        type: Number,
        unique: false
    }],
    test_id: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Test"
    }],
    quantity_test: [{
        type: Number
    }],
    completed: {
        type: Boolean
    }
}, { timestamps: true });

module.exports = mongoose.model("Order", orderSchema);
