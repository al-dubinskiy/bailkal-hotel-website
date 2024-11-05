const { Router } = require("express");
const Room = require("../models/Room");
const router = Router();

// Get rooms
router.get("/", async (reg, res) => {
  try {
  } catch (e) {
    res.status(500).json({
      message: "Get rooms: статус 500. Ошибка сервера.",
    });
  }
});

// Create room
router.post("/", async (reg, res) => {
  try {
    const data = req.body;
    console.log(data);
    const room = new Room(data);
    await room.save();
    res.status(201).json({
      message: "Create room: статус 201. Комната успешно создана.",
    });
  } catch (e) {
    res.status(500).json({
      message: "Create room: статус 500. Ошибка сервера.",
    });
  }
});

// Update room
router.put("/:id", async (reg, res) => {
  try {
  } catch (e) {
    res.status(500).json({
      message: "Update room: статус 500. Ошибка сервера.",
    });
  }
});

// Delete room
router.delete("/:id", async (reg, res) => {
  try {
  } catch (e) {
    res.status(500).json({
      message: "Delete room: статус 500. Ошибка сервера.",
    });
  }
});

module.exports = router;
