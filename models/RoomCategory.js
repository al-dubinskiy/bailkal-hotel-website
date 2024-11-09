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
  included_services: [
    {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "BookingService",
    },
  ],
  guests_capacity: { type: Number, required: true },
  square: { type: Number, required: true },
  price_per_night_for_one_quest: { type: Number, required: true },
  price_per_night_for_two_quest: { type: Number, required: true },
  booked_rooms: [
    {
      room_id: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "Room",
      },
      arrival_datetime: { type: Date, required: true },
      departure_datetime: { type: Date, required: true },
    },
  ],
  created_at: { type: Date, required: true, default: Date.now() },
  updated_at: { type: Date, required: true, default: Date.now() },
});

module.exports = model("RoomCategory", schema);
