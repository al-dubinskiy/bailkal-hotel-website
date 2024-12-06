const { Schema, model, models } = require("mongoose");

const schema = new Schema({
  title: { type: String, required: true, unique: true },
  description: { type: String },
  included_breakfast: { type: Boolean, required: true },
  terms_сancellation: { type: String },
  payment_method_id: [
    {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "PaymentMethod",
    },
  ],
  included_services: [{ type: String }],
  paymentAndCancellationTerms: [{ type: String }],
  note: { type: String },
  cost: { type: Number },
  discount: { type: Number },
  byPromoCode: { type: Boolean, required: true },
  created_at: { type: Date, required: true, default: Date.now() },
  updated_at: { type: Date, required: true, default: Date.now() },
});

module.exports = model("BookingTariff", schema);
