const { Router } = require("express");
const Room = require("../models/Room");
const moment = require("moment");
const router = Router();

// Get rooms
router.get("/", async (req, res) => {
  try {
    const rooms = await Room.find();
    res.status(200).json({
      data: rooms,
    });
  } catch (e) {
    res.status(500).json({
      error: "Get rooms: статус 500. Ошибка сервера.",
    });
  }
});

// Create room
router.post("/", async (req, res) => {
  try {
    const data = req.body;
    const existingRecord = await Room.findOne({ number: data.number });
    if (existingRecord) {
      return res.status(409).json({
        error: "Create room: статус 409. Такая запись уже существует.",
      });
    }
    const room = new Room({
      ...data,
      created_at: moment().format("YYYY-MM-DD HH:mm"),
      updated_at: moment().format("YYYY-MM-DD HH:mm"),
    });
    await room.save();
    res.status(201).json({
      message: "Create room: статус 201. Комната успешно создана.",
    });
  } catch (e) {
    res.status(500).json({
      error: "Create room: статус 500. Ошибка сервера.",
    });
  }
});

// Update room
router.put("/:id", async (req, res) => {
  try {
  } catch (e) {
    res.status(500).json({
      error: "Update room: статус 500. Ошибка сервера.",
    });
  }
});

// Delete room
router.delete("/:id", async (req, res) => {
  try {
  } catch (e) {
    res.status(500).json({
      error: "Delete room: статус 500. Ошибка сервера.",
    });
  }
});

module.exports = router;
