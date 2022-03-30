const { mongoose } = require("mongoose")

const orderSchema = mongoose.Schema({
    patient_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Patient",
        require: true
    },
    pharmacy_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Pharmacy",
        require: true
    },
    laboratory_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Laboratory",
        require: true
    },
    drug_id: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Drug",
        require: true
    }],
    test_id:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Test",
        require: true
    }],
    completed: {
        type: Boolean
    }
}, { timestamps: true });

module.exports = mongoose.model("Order", orderSchema);
