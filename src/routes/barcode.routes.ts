import express from "express";
import barcodeServices from "../services/barcode.services";
const router = express.Router();

router.get("/", barcodeServices.get);

router.get("/:id", barcodeServices.getID);

router.post("/", barcodeServices.post);

router.delete("/", barcodeServices.reset);

export default router;
