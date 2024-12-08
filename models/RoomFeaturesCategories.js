const { Schema, model, models } = require("mongoose");

const schema = new Schema({
  title: { type: String, required: true, unique: true },
  created_at: { type: Date, required: true, default: Date.now() },
  updated_at: { type: Date, required: true, default: Date.now() },
});

module.exports = model("RoomFeaturesCategory", schema);
