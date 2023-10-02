import express from "express";
import waypointServices from "../services/waypoint.services";
const router = express.Router();

router.get("/", waypointServices.get);

export default router;
