import { Request, Response, NextFunction } from "express";
import barcodeRouters from "./routes/barcode.routes";
import dbCreateFlow from "./functions/createDatabaseFlow";
import appRouters from "./routes/app.routes";
import bodyParser from "body-parser";
import express from "express";
import cors from "cors";
import getDataFromRobot from "./functions/getDatafromRobot";
import env from "./providers/environmentProvider";
import taskRouters from "./routes/task.routes";

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

  app.use("/task", taskRouters);

  app.use("/barcode", barcodeRouters);

  app.use("/", appRouters);

  const server = app.listen(env.application.port, async function () {
    await dbCreateFlow();
    await setInterval(async () => getDataFromRobot(), 5000);
    await console.log(
      `[Cloud Robot Services] Service is running on port ${env.application.port}`
    );
  });

  process.on("SIGINT", () => {
    server.close(() => {
      console.log("[Cloud Robot Services] Service is shutting down");
      process.exit(0);
    });
  });
}

main();
