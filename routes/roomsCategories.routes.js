const { Router } = require("express");
const RoomCategory = require("../models/RoomCategory");
const router = Router();

// Get rooms сategories
router.get("/", async (reg, res) => {
  try {
  } catch (e) {
    res.status(500).json({
      error: "Get rooms сategories: статус 500. Ошибка сервера.",
    });
  }
});

// Create room сategory
router.post("/", async (reg, res) => {
  try {
    const data = req.body;
    console.log(data);
    const roomCategory = new RoomCategory(data);
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
router.put("/:id", async (reg, res) => {
  try {
  } catch (e) {
    res.status(500).json({
      error: "Update room сategory: статус 500. Ошибка сервера.",
    });
  }
});

// Delete room сategory
router.delete("/:id", async (reg, res) => {
  try {
  } catch (e) {
    res.status(500).json({
      error: "Delete room сategory: статус 500. Ошибка сервера.",
    });
  }
});

module.exports = router;
