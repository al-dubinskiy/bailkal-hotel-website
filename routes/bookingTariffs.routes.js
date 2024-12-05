const { Router } = require("express");
const BookingTariff = require("../models/BookingTariff");
const moment = require("moment");
const router = Router();

// Get booking tariffs
router.get("/", async (req, res) => {
  try {
    const bookingsTariffs = await BookingTariff.find();
    res.status(200).json({
      data: bookingsTariffs,
    });
  } catch (e) {
    res.status(500).json({
      error: "Get booking tariffs: статус 500. Ошибка сервера.",
    });
  }
});

// Create booking tariff
router.post("/", async (req, res) => {
  try {
    const data = req.body;
    const existingRecord = await BookingTariff.findOne({ title: data.title });
    if (existingRecord) {
      return res.status(409).json({
        error:
          "Create booking tariff: статус 409. Такая запись уже существует.",
      });
    }
    const bookingTariff = new BookingTariff({
      ...data,
      created_at: moment().format("YYYY-MM-DD HH:mm"),
      updated_at: moment().format("YYYY-MM-DD HH:mm"),
    });
    await bookingTariff.save();
    res.status(201).json({
      message:
        "Create booking tariff: статус 201. Тариф бронирования успешно создан.",
    });
  } catch (e) {
    res.status(500).json({
      error: "Create booking tariff: статус 500. Ошибка сервера.",
    });
  }
});

// Update booking tariff
router.put("/:id", async (req, res) => {
  try {
  } catch (e) {
    res.status(500).json({
      error: "Update booking tariff: статус 500. Ошибка сервера.",
    });
  }
});

// Delete booking tariff
router.delete("/:id", async (req, res) => {
  try {
  } catch (e) {
    res.status(500).json({
      error: "Delete booking tariff: статус 500. Ошибка сервера.",
    });
  }
});

module.exports = router;
