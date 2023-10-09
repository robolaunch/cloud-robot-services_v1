import { Request, Response, NextFunction } from "express";
import barcodeRouters from "./routes/barcode.routes";
import dbCreateFlow from "./functions/createDatabaseFlow";
import appRouters from "./routes/app.routes";
import bodyParser from "body-parser";
import express from "express";
import cors from "cors";
import getDataFromRobot from "./functions/getDatafromRobot";
import env from "./providers/environmentProvider";

function main() {
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

  app.listen(env.application.port, async function () {
    await dbCreateFlow();
    await setInterval(async () => getDataFromRobot(), 5000);
    await console.log(
      `[Cloud Robot Services] Service is running on port ${env.application.port}`
    );
  });
}

main();
