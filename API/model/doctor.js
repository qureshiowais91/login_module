const mongoose = require("mongoose");

const doctoreSchema = mongoose.Schema({
 user_id: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
  speciality: {
    type: String,
  },
  fees: {
    type: Number,
  },
  opentime: {
    type: Date,
  },
  closetime: {
    type: Date
  }
});

module.exports = mongoose.model("doctor", doctoreSchema);