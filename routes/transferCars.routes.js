const { Router } = require("express");
const TransferCar = require("../models/TransferCar");
const router = Router();

// Get transfer cars
router.get("/", async (reg, res) => {
  try {
  } catch (e) {
    res.status(500).json({
      error: "Get transfer cars: статус 500. Ошибка сервера.",
    });
  }
});

// Create transfer car
router.post("/", async (reg, res) => {
  try {
    const data = req.body;
    console.log(data);
    const transferCar = new TransferCar(data);
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
router.put("/:id", async (reg, res) => {
  try {
  } catch (e) {
    res.status(500).json({
      error: "Update transfer car: статус 500. Ошибка сервера.",
    });
  }
});

// Delete transfer car
router.delete("/:id", async (reg, res) => {
  try {
  } catch (e) {
    res.status(500).json({
      error: "Delete transfer car: статус 500. Ошибка сервера.",
    });
  }
});

module.exports = router;
