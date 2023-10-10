import logServices from "../services/log.services";
import express from "express";

const router = express.Router();

router.get("/", logServices.task);

export default router;
