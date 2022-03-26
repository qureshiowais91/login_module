const { mongoose } = require("mongoose");

const appoinmentOrderSchema = mongoose.Schema({
    orderBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Patient",
        require: true,
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
        type: Boolean
    },
    drug: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Drug",
        require: true,
        unique: true
    }],
    test: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Test",
        require: true,

    }]
});

module.exports = mongoose.model("appoinmentOrder", appoinmentOrderSchema);