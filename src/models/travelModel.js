const mongoose = require("mongoose");

const TravelSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  createdAt: { type: Date, default: Date.now },
  dateFrom: { type: Date, required: true },
  dateTo: { type: Date, required: true },
  location: {
    country: { type: String, required: true },
    city: { type: String },
    address: { type: String },
  },
  image: { type: String },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
});

const Travel = mongoose.model("Travel", TravelSchema);
module.exports = Travel;
