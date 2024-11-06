const { Schema, model, models } = require("mongoose");

const schema = new Schema({
  title: { type: String, required: true, unique: true },
  description: { type: String },
  paymentSystems: [{ type: String }],
  payment_then_caption: { type: String },
  created_at: { type: Date, required: true, default: Date.now() },
  updated_at: { type: Date, required: true, default: Date.now() },
});

module.exports = model("PaymentMethod", schema);
