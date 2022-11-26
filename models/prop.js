const mongoose = require("mongoose");

const propSchema = new mongoose.Schema({
  item: String,
  dollarVal: String,
  dateAquired: Date,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

const Prop = mongoose.model("Prop", propSchema);

module.exports = Prop;
