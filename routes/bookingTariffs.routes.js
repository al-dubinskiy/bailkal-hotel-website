const { Router } = require("express");
const BookingTariff = require("../models/BookingTariff");
const router = Router();

// Get booking tariffs
router.get("/", async (reg, res) => {
  try {
  } catch (e) {
    res.status(500).json({
      message: "Get booking tariffs: статус 500. Ошибка сервера.",
    });
  }
});

// Create booking tariff
router.post("/", async (reg, res) => {
  try {
    const data = req.body;
    console.log(data);
    const bookingTariff = new BookingTariff(data);
    await bookingTariff.save();
    res.status(201).json({
      message:
        "Create booking tariff: статус 201. Тариф бронирования успешно создан.",
    });
  } catch (e) {
    res.status(500).json({
      message: "Create booking tariff: статус 500. Ошибка сервера.",
    });
  }
});

// Update booking tariff
router.put("/:id", async (reg, res) => {
  try {
  } catch (e) {
    res.status(500).json({
      message: "Update booking tariff: статус 500. Ошибка сервера.",
    });
  }
});

// Delete booking tariff
router.delete("/:id", async (reg, res) => {
  try {
  } catch (e) {
    res.status(500).json({
      message: "Delete booking tariff: статус 500. Ошибка сервера.",
    });
  }
});

module.exports = router;
