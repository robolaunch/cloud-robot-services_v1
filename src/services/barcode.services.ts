import setResponse from "../helper/setResponse";
import rlClient from "../clients/dbRobolaunchClient";
import getRobot from "../functions/getRobot";
import axios from "axios";

async function get(req: any, res: any) {
  try {
    const { rows: data } = await rlClient.query("SELECT * FROM barcodes");
    setResponse(res, 200, "Data query successful", data);
  } catch (error) {
    setResponse(res, 500, "Data query failed", error);
  }
}

async function getWithTime(req: any, res: any) {
  const values = [req.params.time];

  const selectQuery = "SELECT * FROM barcodes WHERE time >= $1";

  try {
    const result = await rlClient.query(selectQuery, values);

    if (result.rowCount === 0) {
      setResponse(res, 404, "Data not found", null);
      return;
    }

    setResponse(res, 200, "Data query successful", result.rows);
  } catch (error) {
    setResponse(res, 500, "Data query failed", error);
  }
}

async function post(req: any, res: any) {
  try {
    const { scanner_id, time, barcode, location_x, location_y, location_z } =
      req.body;

    const { rows: existingData } = await rlClient.query(
      "SELECT * FROM barcodes WHERE barcode = $1",
      [barcode]
    );

    if (existingData.length > 0) {
      setResponse(res, 400, `This barcode "${barcode}" already exists`);
      return;
    }

    await rlClient.query(
      "INSERT INTO barcodes (scanner_id, time, barcode, location_x, location_y, location_z) VALUES ($1, $2, $3, $4, $5, $6)",
      [scanner_id, time, barcode, location_x, location_y, location_z]
    );

    setResponse(res, 200, "Data added successfully");
  } catch (error) {
    setResponse(res, 500, "Data add failed", error);
  }
}

async function remove(req: any, res: any) {
  try {
    const { data } = await axios.delete(`${getRobot().endpoint}/barcode`);

    if (data.success) {
      rlClient.query("INSERT INTO barcodes_log SELECT * FROM barcodes");
      rlClient.query("DELETE FROM barcodes");
      setResponse(res, 200, "All data moved to barcodes_log successfully.");
    }
  } catch (error) {
    setResponse(res, 500, "Error while moving data to barcodes_log.");
  }
}

export default {
  get,
  getWithTime,
  post,
  remove,
};
