import taskServices from "../services/task.services";
import express from "express";

const router = express.Router();

router.get("/", taskServices.get);

router.post("/", taskServices.post);

router.put("/:id", taskServices.put);

router.delete("/:id", taskServices.remove);

export default router;
