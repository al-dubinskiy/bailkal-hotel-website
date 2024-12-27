const { Router } = require("express");
const BookingService = require("../models/BookingService");
const moment = require("moment");
const router = Router();

// Get booking services
router.get("/", async (req, res) => {
  try {
    const bookingsServices = await BookingService.find();
    res.status(200).json({
      data: bookingsServices,
    });
  } catch (e) {
    res.status(500).json({
      error: "Get booking services: статус 500. Ошибка сервера.",
    });
  }
});

// Create booking service
router.post("/", async (req, res) => {
  try {
    const data = req.body;
    const existingRecord = await BookingService.findOne({ value: data.value });
    if (existingRecord) {
      return res.status(409).json({
        error:
          "Create booking service: статус 409. Такая запись уже существует.",
      });
    }
    const bookingService = new BookingService({
      ...data,
      created_at: moment().format("YYYY-MM-DD HH:mm"),
      updated_at: moment().format("YYYY-MM-DD HH:mm"),
    });
    await bookingService.save();
    res.status(201).json({
      message:
        "Create booking service: статус 201. Сервис бронирования успешно создан.",
    });
  } catch (e) {
    res.status(500).json({
      error: "Create booking service: статус 500. Ошибка сервера.",
    });
  }
});

// Update booking service
router.put("/:id", async (req, res) => {
  try {
  } catch (e) {
    res.status(500).json({
      error: "Update booking service: статус 500. Ошибка сервера.",
    });
  }
});

// Delete booking service
router.delete("/:id", async (req, res) => {
  try {
  } catch (e) {
    res.status(500).json({
      error: "Delete booking service: статус 500. Ошибка сервера.",
    });
  }
});

module.exports = router;
