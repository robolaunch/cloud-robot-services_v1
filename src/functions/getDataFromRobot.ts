import axios from "axios";
import rlClient from "../clients/dbRobolaunchClient";
import getRobotEndpoints from "./getRobotEndpoints";
import getAvaliableFiles from "./getAvaliableFiles";

export default async function getDataFromRobot() {
  console.log("Starting data collection from all robots");
  for (const robot of getRobotEndpoints()) {
    console.log(`Collecting data from robot ${robot.robot_id}`);
    try {
      const [apacheRes, dbRes] = await Promise.all([
        axios.get(robot.endpoint),
        rlClient.query(
          `SELECT COUNT(*) FROM barcodes WHERE robot_id = ${robot.robot_id}`
        ),
      ]);

      const availableFiles = getAvaliableFiles(dbRes, apacheRes);

      for (const fileIndex of availableFiles) {
        const response = await axios.get(`${robot.endpoint}/${fileIndex}.txt`);
        const fileDatas = JSON.parse(
          `[${response?.data?.trim()?.slice(0, -1)}]`
        );

        for (const fileData of fileDatas) {
          try {
            await axios.post("http://127.0.0.1:8084/barcode", fileData);
          } catch (error: any) {
            console.log(error.response?.data?.message);
          }
        }
      }
    } catch (error) {
      console.log(`Robot ${robot.robot_id} unreachable`);
    }
    console.log(`Data collection from robot ${robot.robot_id} complete`);
  }
  console.log("Data collection from all robots complete");
}