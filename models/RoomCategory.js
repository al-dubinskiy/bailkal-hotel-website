const { Schema, model, models } = require("mongoose");

const schema = new Schema({
  title: { type: String, required: true, unique: true },
  description: { type: String },
  feature_id: [
    {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "BookingTariff",
    },
  ],
  room_id: [
    {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Room",
    },
  ],
  price_per_night: { type: Number, required: true },
  created_at: { type: Date, required: true, default: Date.now() },
  updated_at: { type: Date, required: true, default: Date.now() },
});

module.exports = model("RoomCategory", schema);
