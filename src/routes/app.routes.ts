import express from "express";
import responseSetter from "../functions/responseSetter";

const router = express.Router();

router.get("/", (_req, res) => {
  responseSetter(
    res,
    200,
    "Backend is running. Please use the API endpoints to access data.",
    null
  );
});

export default router;
