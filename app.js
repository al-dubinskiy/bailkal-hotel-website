const express = require("express");
const config = require("config");
const { default: mongoose } = require("mongoose");

const app = express();

const PORT = config.get("port") || 5000;

app.use(express.json({ extended: true }));

app.use("/api/bookings", require("./routes/bookings.routes.js"));
app.use("/api/roomsCategories", require("./routes/roomsCategories.routes.js"));
app.use("/api/rooms", require("./routes/rooms.routes.js"));
app.use("/api/roomBedVariants", require("./routes/roomBedVariants.routes.js"));
app.use("/api/roomFeatures", require("./routes/roomFeatures.routes.js"));
app.use(
  "/api/viewsFromRoomWindow",
  require("./routes/viewsFromRoomWindow.routes.js")
);
/*?*/ app.use(
  "/api/bookingTariffs",
  require("./routes/bookingTariffs.routes.js")
);
app.use("/api/bookingServices", require("./routes/bookingServices.routes.js"));
app.use("/api/paymentMethods", require("./routes/paymentMethods.routes.js"));
app.use(
  "/api/transferVariants",
  require("./routes/transferVariants.routes.js")
);
app.use("/api/transferCars", require("./routes/transferCars.routes.js"));

async function start() {
  try {
    await mongoose.connect(config.get("mongoUri"), {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    app.listen(PORT, () =>
      console.log(`App has been started on port ${PORT}...`)
    );
  } catch (e) {
    console.log("Server Error: ", e.message);
    process.exit(1);
  }
}

start();
