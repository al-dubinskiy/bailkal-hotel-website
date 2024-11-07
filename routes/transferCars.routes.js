const { Router } = require("express");
const TransferCar = require("../models/TransferCar");
const moment = require("moment");
const router = Router();

// Get transfer cars
router.get("/", async (req, res) => {
  try {
  } catch (e) {
    res.status(500).json({
      error: "Get transfer cars: статус 500. Ошибка сервера.",
    });
  }
});

// Create transfer car
router.post("/", async (req, res) => {
  try {
    const data = req.body;
    const existingRecord = await TransferCar.findOne({
      brand: data.brand,
      model: data.model,
    });
    if (existingRecord) {
      return res.status(409).json({
        error: "Create transfer car: статус 409. Такая запись уже существует.",
      });
    }
    const transferCar = new TransferCar({
      ...data,
      created_at: moment().format("YYYY-MM-DD HH:mm"),
      updated_at: moment().format("YYYY-MM-DD HH:mm"),
    });
    await transferCar.save();
    res.status(201).json({
      message:
        "Create transfer car: статус 201. Вариант трансфера успешно создан.",
    });
  } catch (e) {
    res.status(500).json({
      error: "Create transfer car: статус 500. Ошибка сервера.",
    });
  }
});

// Update transfer car
router.put("/:id", async (req, res) => {
  try {
  } catch (e) {
    res.status(500).json({
      error: "Update transfer car: статус 500. Ошибка сервера.",
    });
  }
});

// Delete transfer car
router.delete("/:id", async (req, res) => {
  try {
  } catch (e) {
    res.status(500).json({
      error: "Delete transfer car: статус 500. Ошибка сервера.",
    });
  }
});

module.exports = router;
