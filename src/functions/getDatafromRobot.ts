import axios from "axios";
import getRobot from "./getRobot";
import rlClient from "../clients/dbRobolaunchClient";
import env from "../providers/environmentProvider";

export default async function getDataFromRobot() {
  try {
    const { rows: data } = await rlClient.query(
      "SELECT time FROM barcodes ORDER BY time DESC LIMIT 1"
    );

    if (data.length === 0) {
      const { data: response } = await axios.get(
        `${getRobot().endpoint}/barcode`
      );

      await PostDataPostgre(response);
    } else {
      const { data: response } = await axios.get(
        `${getRobot().endpoint}/barcode/${data[0].time}`
      );

      await PostDataPostgre(response);
    }
  } catch (error) {
    console.log("[POSTGRE DB] Error while getting data from robot ");
  }
}

async function PostDataPostgre(response: any) {
  const promises = response.data?.map(async (item: any) => {
    try {
      await axios.post(`http://127.0.0.1:${env.application.port}/barcode`, {
        scanner_id: item.scanner_id,
        time: item.time,
        barcode: item.barcode,
        location_x: item.location_x,
        location_y: item.location_y,
        location_z: item.location_z,
      });
    } catch (error) {}
  });

  await Promise.all(promises);
}
