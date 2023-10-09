import axios from "axios";
import getRobot from "./getRobot";
import rlClient from "../clients/dbRobolaunchClient";

export default async function getDataFromRobot() {
  try {
    const { rows: data } = await rlClient.query(
      "SELECT time FROM barcodes ORDER BY time DESC LIMIT 1"
    );

    console.log(data);

    await axios.get(`${getRobot().endpoint}/barcode`).then((res) => {
      console.log(res.data);
    });
  } catch (error) {}
}
