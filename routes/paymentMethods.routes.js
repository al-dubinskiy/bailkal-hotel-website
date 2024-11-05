const { Router } = require("express");
const PaymentMethod = require("../models/PaymentMethod");
const router = Router();

// Get payment methods
router.get("/", async (reg, res) => {
  try {
  } catch (e) {
    res.status(500).json({
      message: "Get payment methods: статус 500. Ошибка сервера.",
    });
  }
});

// Create payment method
router.post("/", async (reg, res) => {
  try {
    const data = req.body;
    console.log(data);
    const paymentMethod = new PaymentMethod(data);
    await paymentMethod.save();
    res.status(201).json({
      message:
        "Create payment method: статус 201. Способ оплаты успешно создан.",
    });
  } catch (e) {
    res.status(500).json({
      message: "Create payment method: статус 500. Ошибка сервера.",
    });
  }
});

// Update payment method
router.put("/:id", async (reg, res) => {
  try {
  } catch (e) {
    res.status(500).json({
      message: "Update payment method: статус 500. Ошибка сервера.",
    });
  }
});

// Delete payment method
router.delete("/:id", async (reg, res) => {
  try {
  } catch (e) {
    res.status(500).json({
      message: "Delete payment method: статус 500. Ошибка сервера.",
    });
  }
});

module.exports = router;
