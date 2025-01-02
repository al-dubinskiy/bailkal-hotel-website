const { Router } = require("express");
const Booking = require("../models/Booking");
const moment = require("moment");
const router = Router();

// Get bookings
router.get("/", async (req, res) => {
  try {
    const bookings = await Booking.find();
    res.status(200).json({
      data: bookings,
    });
  } catch (e) {
    res.status(500).json({
      error: "Get bookings: статус 500. Ошибка сервера.",
    });
  }
});

// Create booking
router.post("/", async (req, res) => {
  try {
    // const data = req.body;
    // const existingRecordByArrivalDatetime = await Booking.findOne({
    //   room_id: data.room_id,
    //   arrival_datetime: data.arrival_datetime,
    // });
    // const existingRecordByDepartureDatetime = await Booking.findOne({
    //   room_id: data.room_id,
    //   departure_datetime: data.departure_datetime,
    // });
    // if (existingRecordByArrivalDatetime) {
    //   return res.status(409).json({
    //     error:
    //       'Create booking: статус 409. Номер на эту дату "заезда" ранее был уже забронирован.',
    //   });
    // }

    // if (existingRecordByDepartureDatetime) {
    //   return res.status(409).json({
    //     error:
    //       'Create booking: статус 409. Номер на эту дату "выезда" ранее был уже забронирован.',
    //   });
    // }
    // const booking = new Booking({
    //   ...data,
    //   created_at: moment().format("YYYY-MM-DD HH:mm"),
    //   updated_at: moment().format("YYYY-MM-DD HH:mm"),
    // });
    // await booking.save();
    // res.status(201).json({
    //   message: "Create booking: статус 201. Бронирование успешно создано.",
    //   data: booking,
    // });

    const bookings = req.body;
    const errors = [];
    const data = [];
    await Promise.all(
      bookings.map(async (booking) => {
        const existingRecordByArrivalDatetime = await Booking.findOne({
          room_id: booking.room_id,
          arrival_datetime: booking.arrival_datetime,
        });
        const existingRecordByDepartureDatetime = await Booking.findOne({
          room_id: booking.room_id,
          departure_datetime: booking.departure_datetime,
        });
        if (existingRecordByArrivalDatetime) {
          return errors.push(
            `Бронирование на комнату с id ${booking.room_id} не было создано по причине того, что номер на эту дату "заезда" ранее был уже забронирован. `
          );
        }
        if (existingRecordByDepartureDatetime) {
          return errors.push(
            `Бронирование на комнату с id ${booking.room_id} не было создано по причине того, что номер на эту дату "выезда" ранее был уже забронирован. `
          );
        }
        const newBooking = new Booking({
          ...booking,
          created_at: moment().format("YYYY-MM-DD HH:mm"),
          updated_at: moment().format("YYYY-MM-DD HH:mm"),
        });
        await newBooking.save();
        return data.push(newBooking);
      })
    );
    if (errors.length === bookings.length) {
      // Если ни одно бронирование не было создано успешно
      return res.status(409).json({
        error: `Create booking: статус 409
        ${errors.join("\n")}`,
      });
    } else if (errors.length < bookings.length) {
      // Если есть хотя бы одно успешно созданное бронирование
      return res.status(201).json({
        message: `
        Create booking: статус 201. Некоторые бронирования успешно созданы.
        Ошибки: ${errors.join("\n")}`,
        data,
      });
    } else if (!errors.length) {
      // Если все бронирования успешно созданы
      return res.status(201).json({
        message: `Create booking: статус 201. Все бронирования успешно созданы.`,
        data,
      });
    }
  } catch (e) {
    console.log(e);
    res.status(500).json({
      error: "Create booking: статус 500. Ошибка сервера.",
    });
  }
});

// Update booking
router.put("/:id", async (req, res) => {
  try {
  } catch (e) {
    res.status(500).json({
      error: "Update booking: статус 500. Ошибка сервера.",
    });
  }
});

// Delete booking
router.delete("/:id", async (req, res) => {
  try {
  } catch (e) {
    res.status(500).json({
      error: "Delete booking: статус 500. Ошибка сервера.",
    });
  }
});

module.exports = router;
