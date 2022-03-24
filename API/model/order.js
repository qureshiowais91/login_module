const { mongoose } = require("mongoose")

const orderSchema = mongoose.Schema({
    orderOf: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Patient",
        require: true,

    },
    appoinment: {
        appoinmentWith: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Doctor",
            require: true
        },
        fees: {
            type: Number
        },
        time: {
            type: Date
        }
    },
    drug: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Drug",
        require: true
    }],
    test: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Test",
        require: true
    }]
})

module.exports = mongoose.module("Order", orderSchema);
