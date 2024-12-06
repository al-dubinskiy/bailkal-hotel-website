const { Schema, model, models } = require("mongoose");

const schema = new Schema({
  title: { type: String, required: true, unique: true },
  description: { type: String },
  feature_id: [
    {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "RoomFeature",
    },
  ],
  room_id: [
    {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Room",
    },
  ],
  include_service_id: [
    {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "BookingService",
    },
  ],
  available_bed_variant_id: [
    {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "RoomBedVariant",
    },
  ],
  available_tariff_id: [
    {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "BookingTariff",
    },
  ],
  guests_capacity: { type: Number, required: true },
  square: { type: Number, required: true },
  price_per_night_for_one_quest: { type: Number, required: true },
  price_per_night_for_two_quest: { type: Number, required: true },
  discount: { type: Number },
  created_at: { type: Date, required: true, default: Date.now() },
  updated_at: { type: Date, required: true, default: Date.now() },
});

module.exports = model("RoomCategory", schema);
