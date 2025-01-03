const { Router } = require("express");
const TransferVariant = require("../models/TransferVariant");
const moment = require("moment");
const router = Router();

// Get transfer variants
router.get("/", async (req, res) => {
  try {
    const transferVariants = await TransferVariant.find();
    const updated = transferVariants.map((i) => {
      return {
        _id: i._id,
        from_hotel: i.from_hotel,
        to_hotel: i.to_hotel,
        time_from:
          i.time_from < 10 ? `0${i.time_from}:00` : `${i.time_from}:00`,
        time_to: i.time_to < 10 ? `0${i.time_to}:00` : `${i.time_to}:00`,
        car_id: i.car_id,
        price: i.price,
        created_at: i.created_at,
        updated_at: i.updated_at,
      };
    });
    res.status(200).json({
      data: updated,
    });
  } catch (e) {
    res.status(500).json({
      error: "Get transfer variants: статус 500. Ошибка сервера.",
    });
  }
});

// Create transfer variant
router.post("/", async (req, res) => {
  try {
    const data = req.body;
    const existingRecord = await TransferVariant.findOne({ ...data });
    if (existingRecord) {
      return res.status(409).json({
        error:
          "Create booking service: статус 409. Такая запись уже существует.",
      });
    }
    const transferVariant = new TransferVariant({
      ...data,
      created_at: moment().format("YYYY-MM-DD HH:mm"),
      updated_at: moment().format("YYYY-MM-DD HH:mm"),
    });
    await transferVariant.save();
    res.status(201).json({
      message:
        "Create transfer variant: статус 201. Вариант трансфера успешно создан.",
    });
  } catch (e) {
    res.status(500).json({
      error: "Create transfer variant: статус 500. Ошибка сервера.",
    });
  }
});

// Update transfer variant
router.put("/:id", async (req, res) => {
  try {
  } catch (e) {
    res.status(500).json({
      error: "Update transfer variant: статус 500. Ошибка сервера.",
    });
  }
});

// Delete transfer variant
router.delete("/:id", async (req, res) => {
  try {
  } catch (e) {
    res.status(500).json({
      error: "Delete transfer variant: статус 500. Ошибка сервера.",
    });
  }
});

module.exports = router;
