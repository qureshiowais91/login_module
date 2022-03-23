const { mongoose } = require("mongoose");

const drugSchema = mongoose.Schema({
    addedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "pharmacy",
        require: true
    },
    drugName: {
        type: String
    },
    company: {
        type: String
    },
    price: {
        type: Number
    },
    power: {
        type: String
    },
    level: {
        type: Number
    }
});

module.exports = mongoose.model("drug", drugSchema);