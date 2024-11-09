const { Router } = require("express");
const RoomBedVariant = require("../models/RoomBedVariant");
const moment = require("moment");
const router = Router();

// Get room bed variants
router.get("/", async (req, res) => {
  try {
  } catch (e) {
    res.status(500).json({
      error: "Get room bed variants: статус 500. Ошибка сервера.",
    });
  }
});

// Create room bed variant
router.post("/", async (req, res) => {
  try {
    const data = req.body;
    const existingRecord = await RoomBedVariant.findOne({ title: data.title });
    if (existingRecord) {
      return res.status(409).json({
        error:
          "Create room bed variant: статус 409. Такая запись уже существует.",
      });
    }
    const roomBedVariant = new RoomBedVariant({
      ...data,
      created_at: moment().format("YYYY-MM-DD HH:mm"),
      updated_at: moment().format("YYYY-MM-DD HH:mm"),
    });
    await roomBedVariant.save();
    res.status(201).json({
      message: "Create room bed variant: статус 201. Комната успешно создана.",
    });
  } catch (e) {
    res.status(500).json({
      error: "Create room bed variant: статус 500. Ошибка сервера.",
    });
  }
});

// Update room bed variant
router.put("/:id", async (req, res) => {
  try {
  } catch (e) {
    res.status(500).json({
      error: "Update room bed variant: статус 500. Ошибка сервера.",
    });
  }
});

// Delete room bed variant
router.delete("/:id", async (req, res) => {
  try {
  } catch (e) {
    res.status(500).json({
      error: "Delete room bed variant: статус 500. Ошибка сервера.",
    });
  }
});

module.exports = router;
