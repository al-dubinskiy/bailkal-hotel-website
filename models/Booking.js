const { Schema, model, models } = require("mongoose");

const schema = new Schema({
  room_id: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "Room",
  },
  room_category_id: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "RoomCategory",
  },
  user: {
    name: { type: String, required: true },
    lastname: { type: String, required: true },
    surname: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true },
    nationality: { type: String, required: true },
    send_confirm_on_phone: { type: Boolean },
    want_to_know_about_special_offers_and_news: { type: Boolean },
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
  service_id: [{ type: Schema.Types.ObjectId, ref: "BookingService" }],
  payment_method_id: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "PaymentMethod",
  },
  bed_type_id: {
    type: Schema.Types.ObjectId,
    ref: "RoomBedType",
  },
  view_from_window_id: {
    type: Schema.Types.ObjectId,
    ref: "RoomViewFromWindow",
  },
  payment_method_id: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "Transfer",
  },
  transfer_id: {
    type: Schema.Types.ObjectId,
    ref: "Transfer",
  },
  transfer_comment: { type: String },
  price: { type: Number, required: true },
  comment: { type: String },
  booking_for_whom: { type: String, required: true },
  created_at: { type: Date, required: true, default: Date.now() },
  updated_at: { type: Date, required: true, default: Date.now() },
});

module.exports = model("Booking", schema);
