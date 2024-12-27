const { Schema, model, models } = require("mongoose");

const schema = new Schema({
  title: { type: String, required: true, unique: true },
  description: { type: String },
  category_id: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "RoomFeaturesCategory",
  },
  created_at: { type: Date, required: true, default: Date.now() },
  updated_at: { type: Date, required: true, default: Date.now() },
});

module.exports = model("RoomFeature", schema);
