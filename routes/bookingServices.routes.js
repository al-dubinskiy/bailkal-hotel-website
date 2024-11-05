const { Router } = require("express");
const BookingService = require("../models/BookingService");
const router = Router();

// Get booking services
router.get("/", async (reg, res) => {
  try {
  } catch (e) {
    res.status(500).json({
      message: "Get booking services: статус 500. Ошибка сервера.",
    });
  }
});

// Create booking service
router.post("/", async (reg, res) => {
  try {
    const data = req.body;
    console.log(data);
    const bookingService = new BookingService(data);
    await bookingService.save();
    res.status(201).json({
      message:
        "Create booking service: статус 201. Сервис бронирования успешно создан.",
    });
  } catch (e) {
    res.status(500).json({
      message: "Create booking service: статус 500. Ошибка сервера.",
    });
  }
});

// Update booking service
router.put("/:id", async (reg, res) => {
  try {
  } catch (e) {
    res.status(500).json({
      message: "Update booking service: статус 500. Ошибка сервера.",
    });
  }
});

// Delete booking service
router.delete("/:id", async (reg, res) => {
  try {
  } catch (e) {
    res.status(500).json({
      message: "Delete booking service: статус 500. Ошибка сервера.",
    });
  }
});

module.exports = router;
