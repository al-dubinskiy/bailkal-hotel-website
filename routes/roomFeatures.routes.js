const { Router } = require("express");
const RoomFeature = require("../models/RoomFeature");
const moment = require("moment");
const router = Router();

// Get room feature features
router.get("/", async (req, res) => {
  try {
  } catch (e) {
    res.status(500).json({
      error: "Get room feature features: статус 500. Ошибка сервера.",
    });
  }
});

// Create room feature
router.post("/", async (req, res) => {
  try {
    const data = req.body;
    const existingRecord = await RoomFeature.findOne({ title: data.title });

    if (existingRecord) {
      return res.status(409).json({
        error: "Create room feature: статус 409. Такая запись уже существует.",
      });
    }

    const roomFeature = new RoomFeature({
      ...data,
      created_at: moment().format("YYYY-MM-DD HH:mm"),
      updated_at: moment().format("YYYY-MM-DD HH:mm"),
    });
    await roomFeature.save();
    res.status(201).json({
      message:
        "Create room feature: статус 201. Особенность комнаты успешно создана.",
    });
  } catch (e) {
    res.status(500).json({
      error: "Create room feature: статус 500. Ошибка сервера.",
    });
  }
});

// Update room feature
router.put("/:id", async (req, res) => {
  try {
  } catch (e) {
    res.status(500).json({
      error: "Update room feature: статус 500. Ошибка сервера.",
    });
  }
});

// Delete room feature
router.delete("/:id", async (req, res) => {
  try {
  } catch (e) {
    res.status(500).json({
      error: "Delete room feature: статус 500. Ошибка сервера.",
    });
  }
});

module.exports = router;
