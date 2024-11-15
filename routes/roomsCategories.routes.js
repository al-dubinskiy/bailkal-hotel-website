const { Router } = require("express");
const RoomCategory = require("../models/RoomCategory");
const moment = require("moment");
const router = Router();

// Get rooms сategories
router.get("/", async (req, res) => {
  try {
    const roomsCategories = await RoomCategory.find();

    res.status(200).json({
      data: roomsCategories,
    });
  } catch (e) {
    res.status(500).json({
      error: "Get rooms сategories: статус 500. Ошибка сервера.",
    });
  }
});

// Create room сategory
router.post("/", async (req, res) => {
  try {
    const data = req.body;
    const existingRecord = await RoomCategory.findOne({ title: data.title });
    if (existingRecord) {
      return res.status(409).json({
        error: "Create room category: статус 409. Такая запись уже существует.",
      });
    }
    const roomCategory = new RoomCategory({
      ...data,
      created_at: moment().format("YYYY-MM-DD HH:mm"),
      updated_at: moment().format("YYYY-MM-DD HH:mm"),
    });
    await roomCategory.save();
    res.status(201).json({
      message:
        "Create room сategory: статус 201. Категория номера успешно создана.",
    });
  } catch (e) {
    res.status(500).json({
      error: "Create rooms сategory: статус 500. Ошибка сервера.",
    });
  }
});

// Update room сategory
router.put("/:id", async (req, res) => {
  try {
  } catch (e) {
    res.status(500).json({
      error: "Update room сategory: статус 500. Ошибка сервера.",
    });
  }
});

// Delete room сategory
router.delete("/:id", async (req, res) => {
  try {
  } catch (e) {
    res.status(500).json({
      error: "Delete room сategory: статус 500. Ошибка сервера.",
    });
  }
});

module.exports = router;
