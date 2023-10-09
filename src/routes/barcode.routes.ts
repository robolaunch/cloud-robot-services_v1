import express from "express";
import barcodeServices from "../services/barcode.services";
const router = express.Router();

router.get("/", barcodeServices.get);

router.get("/:time", barcodeServices.getWithTime);

router.post("/", barcodeServices.post);

router.delete("/", barcodeServices.remove);

export default router;
