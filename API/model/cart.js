const { mongoose } = require("mongoose");
// cart and order data could change
// user may order one thing and later add more things to order
// cart and order is not same data
const cartSchema = mongoose.Schema({
    appoinment: {
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
        fees: {
            type: Number
        },
        time: {
            type: Date
        }
    },
    medicine_id: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "medicine",
        require: true
    }],
    lab_test_id: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "medicine",
        require: true
    }]
})

module.exports = mongoose.model("Cart", cartSchema);