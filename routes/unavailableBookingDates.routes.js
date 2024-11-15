const { Router } = require("express");
const UnavailableBookingDate = require("../models/UnavailableBookingDate");
const moment = require("moment");
const router = Router();

// Get unavailable booking dates
router.get("/", async (req, res) => {
  try {
  } catch (e) {
    res.status(500).json({
      error: "Get unavailable booking dates: статус 500. Ошибка сервера.",
    });
  }
});

// Create unavailable booking date
router.post("/", async (req, res) => {
  try {
    const data = req.body;
    const existingRecord = await UnavailableBookingDate.findOne({
      date: data.date,
    });
    if (existingRecord) {
      return res.status(409).json({
        error:
          "Create unavailable booking date: статус 409. Такая запись уже существует.",
      });
    }
    const unavailableBookingDate = new UnavailableBookingDate({
      ...data,
      created_at: moment().format("YYYY-MM-DD HH:mm"),
      updated_at: moment().format("YYYY-MM-DD HH:mm"),
    });
    await unavailableBookingDate.save();
    res.status(201).json({
      message:
        "Create unavailable booking date: статус 201. Недоступная дата для бронирование успешно создана.",
    });
  } catch (e) {
    res.status(500).json({
      error: "Create unavailable booking date: статус 500. Ошибка сервера.",
    });
  }
});

// Update unavailable booking date
router.put("/:id", async (req, res) => {
  try {
  } catch (e) {
    res.status(500).json({
      error: "Update unavailable booking date: статус 500. Ошибка сервера.",
    });
  }
});

// Delete unavailable booking date
router.delete("/:id", async (req, res) => {
  try {
  } catch (e) {
    res.status(500).json({
      error: "Delete unavailable booking date: статус 500. Ошибка сервера.",
    });
  }
});

module.exports = router;
