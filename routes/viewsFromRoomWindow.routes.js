const { Router } = require("express");
const ViewFromRoomWindow = require("../models/ViewFromRoomWindow");
const moment = require("moment");
const router = Router();

// Get views from view from room window window
router.get("/", async (req, res) => {
  try {
  } catch (e) {
    res.status(500).json({
      error:
        "Get views from view from room window window: статус 500. Ошибка сервера.",
    });
  }
});

// Create view from room window
router.post("/", async (req, res) => {
  try {
    const data = req.body;
    const existingRecord = await ViewFromRoomWindow.findOne({
      title: data.title,
    });
    if (existingRecord) {
      return res.status(409).json({
        error:
          "Create view from room window: статус 409. Такая запись уже существует.",
      });
    }
    const viewFromRoomWindow = new ViewFromRoomWindow({
      ...data,
      created_at: moment().format("YYYY-MM-DD HH:mm"),
      updated_at: moment().format("YYYY-MM-DD HH:mm"),
    });
    await viewFromRoomWindow.save();
    res.status(201).json({
      message:
        "Create view from room window: статус 201. Вид из окна успешно создан.",
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      error: "Create view from room window: статус 500. Ошибка сервера.",
    });
  }
});

// Update view from room window
router.put("/:id", async (req, res) => {
  try {
  } catch (e) {
    res.status(500).json({
      error: "Update view from room window: статус 500. Ошибка сервера.",
    });
  }
});

// Delete view from room window
router.delete("/:id", async (req, res) => {
  try {
  } catch (e) {
    res.status(500).json({
      error: "Delete view from room window: статус 500. Ошибка сервера.",
    });
  }
});

module.exports = router;
