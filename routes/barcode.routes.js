const express = require("express");
const router = express.Router();
const barcodeServices = require("../services/barcode.services");

router.get("/", barcodeServices.get);

router.get("/:id", barcodeServices.getID);

router.post("/", barcodeServices.post);

module.exports = router;
