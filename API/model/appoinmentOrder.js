const { mongoose } = require("mongoose");

const appoinmentOrderSchema = mongoose.Schema({
    orderBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Patient",
        require: true
    },
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
    },
    completed: {
        type: String
    },
    pharmacy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Pharmacy",
        require: true
    },
    drug: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Drug",
        require: true,
    }],
    laboratory: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Laboratory",
        require: true
    },
    test: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Test",
        require: true,
    }]
});

module.exports = mongoose.model("appoinmentOrder", appoinmentOrderSchema);