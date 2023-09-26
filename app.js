const db_creator = require("./db_creator");
const bodyParser = require("body-parser");
const express = require("express");
const cors = require("cors");
require("dotenv").config();
const app = express();

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

app.get("/barcode", function (req, res) {
  db_creator();

  res.send(200, "test");
});

app.post("/barcode/index", function (req, res) {
  db_creator();

  res.send(200, "test");
});

var server = app.listen(8084, function () {
  console.log("Server is running on port 8084");
});
