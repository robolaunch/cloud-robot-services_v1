import appServices from "../services/app.services";
import express from "express";

const router = express.Router();

router.get("/", appServices.get);

export default router;
