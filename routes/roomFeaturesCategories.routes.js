const { Router } = require("express");
const RoomFeaturesCategory = require("../models/RoomFeaturesCategories");
const moment = require("moment");
const router = Router();

// Get room featurs categories
router.get("/", async (req, res) => {
  try {
    const roomsFeaturesCategories = await RoomFeaturesCategory.find();

    res.status(200).json({
      data: roomsFeaturesCategories,
    });
  } catch (e) {
    res.status(500).json({
      error: "Get room features categories: статус 500. Ошибка сервера.",
    });
  }
});

// Create room feature category
router.post("/", async (req, res) => {
  try {
    const data = req.body;
    const existingRecord = await RoomFeaturesCategory.findOne({
      title: data.title,
    });

    if (existingRecord) {
      return res.status(409).json({
        error:
          "Create room features category: статус 409. Такая запись уже существует.",
      });
    }

    const roomFeaturesCategory = new RoomFeaturesCategory({
      ...data,
      created_at: moment().format("YYYY-MM-DD HH:mm"),
      updated_at: moment().format("YYYY-MM-DD HH:mm"),
    });

    await roomFeaturesCategory.save();

    res.status(201).json({
      message:
        "Create room features category: статус 201. Категория особенностей комнаты успешно создана.",
    });
  } catch (e) {
    res.status(500).json({
      error: "Create room features category: статус 500. Ошибка сервера.",
    });
  }
});

// Update room features category
router.put("/:id", async (req, res) => {
  try {
  } catch (e) {
    res.status(500).json({
      error: "Update room features category: статус 500. Ошибка сервера.",
    });
  }
});

// Delete room features category
router.delete("/:id", async (req, res) => {
  try {
  } catch (e) {
    res.status(500).json({
      error: "Delete room features category: статус 500. Ошибка сервера.",
    });
  }
});

module.exports = router;
