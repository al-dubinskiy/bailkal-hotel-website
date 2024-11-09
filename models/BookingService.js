const { Schema, model, models } = require("mongoose");

const schema = new Schema({
  title: { type: String, required: true, unique: true },
  description: { type: String },
  price: { type: Number, required: true },
  isPricePerNight: { type: Boolean, required: true },
  forGuestsNumber: { type: String, required: true },
  isCanOrderSeveral: { type: Boolean, required: true },
  created_at: { type: Date, required: true, default: Date.now() },
  updated_at: { type: Date, required: true, default: Date.now() },
});

module.exports = model("BookingService", schema);
