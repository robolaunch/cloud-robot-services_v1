const db_creator = require("./functions/dbCreateFlow");
const bodyParser = require("body-parser");
const express = require("express");
const cors = require("cors");
require("dotenv").config();
const app = express();
const appRouters = require("./routes/app.routes");
const barcodeRouters = require("./routes/barcode.routes");

app.all("/*", function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
});

app.use(
  bodyParser.json(),
  cors({
    origin: "*",
  })
);

app.use("/", appRouters);

app.use("/barcode", barcodeRouters);

var server = app.listen(8084, function () {
  console.log("Server is running on port 8084");
});
