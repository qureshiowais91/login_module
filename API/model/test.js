const { mongoose } = require("mongoose");

const testSchema = mongoose.Schema({
    addedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Laboratory",
        require: true
    },
    testname: {
        type: String
    },
    price: {
        type: Number
    }
});

module.exports = mongoose.model("Test", testSchema);