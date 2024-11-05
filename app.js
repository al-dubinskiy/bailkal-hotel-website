const express = require("express");
const config = require("config");
const { MongoClient, ServerApiVersion } = require("mongodb");

const app = express();

const PORT = config.get("port") || 5000;

app.use("/api/bookings", require("./routes/bookings.routes.js"));
app.use("/api/roomsCategories", require("./routes/roomsCategories.routes.js"));
app.use("/api/rooms", require("./routes/rooms.routes.js"));
app.use("/api/bedTypes", require("./routes/roomBedTypes.routes.js"));
app.use("/api/bookingTariffs", require("./routes/bookingTariffs.routes.js"));
app.use("/api/bookingServices", require("./routes/bookingServices.routes.js"));
app.use("/api/paymentMethods", require("./routes/paymentMethods.routes.js"));
app.use(
  "/api/transferVariants",
  require("./routes/transferVariants.routes.js")
);

const client = new MongoClient(config.get("mongoUri"), {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    await client.connect();
    app.listen(PORT, () =>
      console.log(`App has been started on port ${PORT}...`)
    );
  } catch (e) {
    console.log("Server Error", e.message);
    process.exit(1);
  } finally {
    await client.close();
  }
}

run().catch(console.dir);
