const { mongoose } = require("mongoose")

const orderSchema = mongoose.Schema({
    patient_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Patient",
        require: true
    },
    appoinment_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Appoinment"
    },
    drug: [{
        pharmacy_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Pharmacy"
        },
        name: {
            type: String,
        },
        price: {
            type: Number
        },
        quantity_drug: {
            type: Number
        }
    }],
    test: [{
        laboratory_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Laboratory"
        },
        name: {
            type: String,
        },
        price: {
            type: Number
        }
    }],
    completed: {
        type: Boolean
    }
}, { timestamps: true });

module.exports = mongoose.model("Order", orderSchema);
