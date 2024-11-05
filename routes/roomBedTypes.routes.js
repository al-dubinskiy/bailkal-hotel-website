const { Router } = require("express");
const RoomBedType = require("../models/RoomBedType");
const router = Router();

// Get room bed types
router.get("/", async (reg, res) => {
  try {
  } catch (e) {
    res.status(500).json({
      message: "Get room bed types: статус 500. Ошибка сервера.",
    });
  }
});

// Create room bed type
router.post("/", async (reg, res) => {
  try {
    const data = req.body;
    console.log(data);
    const roomBedType = new RoomBedType(data);
    await roomBedType.save();
    res.status(201).json({
      message: "Create room bed type: статус 201. Комната успешно создана.",
    });
  } catch (e) {
    res.status(500).json({
      message: "Create room bed type: статус 500. Ошибка сервера.",
    });
  }
});

// Update room bed type
router.put("/:id", async (reg, res) => {
  try {
  } catch (e) {
    res.status(500).json({
      message: "Update room bed type: статус 500. Ошибка сервера.",
    });
  }
});

// Delete room bed type
router.delete("/:id", async (reg, res) => {
  try {
  } catch (e) {
    res.status(500).json({
      message: "Delete room bed type: статус 500. Ошибка сервера.",
    });
  }
});

module.exports = router;
