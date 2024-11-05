const { Schema, model, models } = require("mongoose");

const schema = new Schema({
  id: { type: Schema.Types.UUID, required: true, unique: true },
  room_id: { type: Schema.Types.UUID, required: true, unique: true },
  user: {
    name: { type: String, required: true },
    lastname: { type: String, required: true },
    surname: { type: String, required: true },
    phone: { type: Number, required: true },
    email: { type: String, required: true },
  },
  adults_count: { type: Number, required: true },
  children_count: { type: Number, required: true },
  arrival_datetime: { type: Date, required: true },
  departure_datetime: { type: Date, required: true },
  tariff_id: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "BookingTariff",
  },
  service_id: [
    { type: Schema.Types.ObjectId, required: true, ref: "BookingService" },
  ],
  payment_method_id: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "PaymentMethod",
  },
  bed_type_id: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "RoomBedType",
  },
  view_from_window_id: {
    type: Schema.Types.UUID,
    required: true,
    ref: "RoomViewFromWindow",
  },
  payment_method_id: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "Transfer",
  },
  price: { type: Number, required: true },
  created_at: { type: Date, required: true, default: Date.now() },
  updated_at: { type: Date, required: true, default: Date.now() },
});

module.exports = model("Booking", schema);
