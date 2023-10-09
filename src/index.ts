import { Request, Response, NextFunction } from "express";
import barcodeRouters from "./routes/barcode.routes";
import dbCreateFlow from "./functions/createDatabaseFlow";
import appRouters from "./routes/app.routes";
import bodyParser from "body-parser";
import express from "express";
import cors from "cors";
import waypointRouters from "./routes/waypoint.routes";
import getDataFromRobot from "./functions/getDatafromRobot";

const app = express();

app.all("/*", function (req: Request, res: Response, next: NextFunction) {
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

app.use("/waypoint", waypointRouters);

app.listen(8090, async function () {
  await console.log("[Express Backend] Server is running on port 8090");
  await dbCreateFlow();
  await getDataFromRobot();
});
