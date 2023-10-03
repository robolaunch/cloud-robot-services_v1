import rlClient from "../clients/dbRobolaunchClient";
import getRobotEndpoints from "./getRobotEndpoints";
import getAvaliableFiles from "./getAvaliableFiles";
import axios from "axios";

export default async function getBarcodeFromRobot() {
  console.log("[Barcode Job] Starting barcode collection from all robots");
  for (const robot of getRobotEndpoints()) {
    console.log(
      `[RobotID:${robot.robot_id}] Collecting barcode from robot ${robot.robot_id}`
    );
    try {
      const [apacheRes, dbRes] = await Promise.all([
        axios.get(robot.endpoint + "/barcode/"),

        rlClient.query(
          `SELECT COUNT(*) FROM barcodes WHERE robot_id = ${robot.robot_id}`
        ),
      ]);

      const availableFiles = getAvaliableFiles(dbRes, apacheRes);

      for (const fileIndex of availableFiles) {
        const response = await axios.get(
          `${robot.endpoint}/barcode/${fileIndex}.txt`
        );
        const fileDatas = JSON.parse(
          `[${response?.data?.trim()?.slice(0, -1)}]`
        );

        for (const fileData of fileDatas) {
          try {
            await axios.post("http://127.0.0.1:8084/barcode", fileData);
          } catch (error: any) {
            console.log(
              `[RobotID:${robot.robot_id} FileID:${fileIndex}] ${error.response?.data?.message}`
            );
          }
        }
      }
    } catch (error) {
      console.log(`[ERROR] Robot ${robot.robot_id} unreachable`);
    }
    console.log(
      `[RobotID:${robot.robot_id}] Barcode collection from robot ${robot.robot_id} complete`
    );
  }
  console.log("[Barcode Job] Barcode collection from all robots complete");
}