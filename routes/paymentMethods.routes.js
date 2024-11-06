const { Router } = require("express");
const PaymentMethod = require("../models/PaymentMethod");
const moment = require("moment");
const router = Router();

// Get payment methods
router.get("/", async (req, res) => {
  try {
  } catch (e) {
    res.status(500).json({
      error: "Get payment methods: статус 500. Ошибка сервера.",
    });
  }
});

// Create payment method
router.post("/", async (req, res) => {
  try {
    const data = req.body;
    const existingRecord = await PaymentMethod.findOne({ title: data.title });
    if (existingRecord) {
      return res.status(409).json({
        error:
          "Create payment method: статус 409. Такая запись уже существует.",
      });
    }
    const paymentMethod = new PaymentMethod({
      ...data,
      created_at: moment().format("YYYY-MM-DD HH:mm"),
      updated_at: moment().format("YYYY-MM-DD HH:mm"),
    });
    await paymentMethod.save();
    res.status(201).json({
      message:
        "Create payment method: статус 201. Способ оплаты успешно создан.",
    });
  } catch (e) {
    res.status(500).json({
      error: "Create payment method: статус 500. Ошибка сервера.",
    });
  }
});

// Update payment method
router.put("/:id", async (req, res) => {
  try {
  } catch (e) {
    res.status(500).json({
      error: "Update payment method: статус 500. Ошибка сервера.",
    });
  }
});

// Delete payment method
router.delete("/:id", async (req, res) => {
  try {
  } catch (e) {
    res.status(500).json({
      error: "Delete payment method: статус 500. Ошибка сервера.",
    });
  }
});

module.exports = router;
