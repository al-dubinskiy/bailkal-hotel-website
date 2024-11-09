const { Schema, model, models } = require("mongoose");

const schema = new Schema({
  brand: { type: String, required: true },
  model: { type: String, required: true },
  seats_number: { type: Number, required: true },
  body_type: { type: String, required: true },
  created_at: { type: Date, required: true, default: Date.now() },
  updated_at: { type: Date, required: true, default: Date.now() },
});

module.exports = model("TransferCar", schema);
