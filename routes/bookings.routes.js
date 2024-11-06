const { Router } = require("express");
const Booking = require("../models/Booking");
const router = Router();

// Get bookings
router.get("/", async (reg, res) => {
  try {
  } catch (e) {
    res.status(500).json({
      error: "Get bookings: статус 500. Ошибка сервера.",
    });
  }
});

// Create booking
router.post("/", async (reg, res) => {
  try {
    const data = req.body;
    console.log(data);
    const booking = new Booking(data);
    await booking.save();
    res.status(201).json({
      message: "Create booking: статус 201. Бронирование успешно создано.",
    });
  } catch (e) {
    res.status(500).json({
      error: "Create booking: статус 500. Ошибка сервера.",
    });
  }
});

// Update booking
router.put("/:id", async (reg, res) => {
  try {
  } catch (e) {
    res.status(500).json({
      error: "Update booking: статус 500. Ошибка сервера.",
    });
  }
});

// Delete booking
router.delete("/:id", async (reg, res) => {
  try {
  } catch (e) {
    res.status(500).json({
      error: "Delete booking: статус 500. Ошибка сервера.",
    });
  }
});

module.exports = router;
