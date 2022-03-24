const { mongoose } = require("mongoose");

const testSchema = mongoose.Schema({
    addedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Pharmacy",
        require: true
    },
    testName: {
        type: String
    },
    price: {
        type: Number
    },
});

module.exports = mongoose.model("Test", testSchema);