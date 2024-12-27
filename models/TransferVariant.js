const { Schema, model, models } = require("mongoose");

const schema = new Schema({
  from_hotel: { type: Boolean, required: true },
  to_hotel: { type: Boolean, required: true },
  time_from: { type: Number, required: true },
  time_to: { type: Number, required: true },
  price: { type: Number, required: true },
  car_id: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "TransferCar",
  },
  comment: { type: String },
  created_at: { type: Date, required: true, default: Date.now() },
  updated_at: { type: Date, required: true, default: Date.now() },
});

module.exports = model("TransferVariant", schema);
