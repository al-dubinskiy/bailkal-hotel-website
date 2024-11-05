const { Router } = require("express");
const TransferVariant = require("../models/TransferVariant");
const router = Router();

// Get transfer variants
router.get("/", async (reg, res) => {
  try {
  } catch (e) {
    res.status(500).json({
      message: "Get transfer variants: статус 500. Ошибка сервера.",
    });
  }
});

// Create transfer variant
router.post("/", async (reg, res) => {
  try {
    const data = req.body;
    console.log(data);
    const transferVariant = new TransferVariant(data);
    await transferVariant.save();
    res.status(201).json({
      message:
        "Create transfer variant: статус 201. Вариант трансфера успешно создан.",
    });
  } catch (e) {
    res.status(500).json({
      message: "Create transfer variant: статус 500. Ошибка сервера.",
    });
  }
});

// Update transfer variant
router.put("/:id", async (reg, res) => {
  try {
  } catch (e) {
    res.status(500).json({
      message: "Update transfer variant: статус 500. Ошибка сервера.",
    });
  }
});

// Delete transfer variant
router.delete("/:id", async (reg, res) => {
  try {
  } catch (e) {
    res.status(500).json({
      message: "Delete transfer variant: статус 500. Ошибка сервера.",
    });
  }
});

module.exports = router;
