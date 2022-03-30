const { mongoose } = require("mongoose");

const testSchema = mongoose.Schema({
    addedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Laboratory",
        require: true
    },
    test: {
        type: String
    },
    price: {
        type: Number
    },
});

module.exports = mongoose.model("Test", testSchema);