const { Schema, model, models } = require("mongoose");

const schema = new Schema({
  number: { type: Number, required: true, unique: true },
  created_at: { type: Date, required: true, default: Date.now() },
  updated_at: { type: Date, required: true, default: Date.now() },
});

module.exports = model("Room", schema);
