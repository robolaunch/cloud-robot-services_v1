import responseSetter from "../functions/responseSetter";
import rlClient from "../clients/dbRobolaunchClient";

async function get(req: any, res: any) {
  try {
    const { rows: data } = await rlClient.query("SELECT * FROM barcodes");
    responseSetter(res, 200, "Data query successful", data);
  } catch (error) {
    responseSetter(res, 500, "Data query failed", error);
  }
}

//
//

async function getID(req: any, res: any) {
  const id = req.params.id;
  const selectQuery = "SELECT * FROM barcodes WHERE id >= $1";
  const values = [id];

  try {
    const result = await rlClient.query(selectQuery, values);
    if (result.rowCount === 0) {
      responseSetter(res, 404, "Data not found", null);
    } else {
      const data = result.rows;
      responseSetter(res, 200, "Data query successful", data);
    }
  } catch (error) {
    console.log("Data query failed", error);
    responseSetter(res, 500, "Data query failed", error);
  }
}

//
//

async function post(req: any, res: any) {
  const { scanner_id, time, barcode, location_x, location_y, location_z } =
    req.body;

  try {
    const { rows: data } = await rlClient.query(
      "SELECT * FROM barcodes WHERE barcode = $1",
      [barcode]
    );

    if (data.length > 0) {
      responseSetter(res, 400, `This barcode "${barcode}" already exists`);
      return;
    }

    await rlClient.query(
      "INSERT INTO barcodes (scanner_id, time, barcode, location_x, location_y, location_z) VALUES ($1, $2, $3, $4, $5, $6)",
      [scanner_id, time, barcode, location_x, location_y, location_z]
    );

    responseSetter(res, 200, "Data added successfully");
  } catch (error) {
    responseSetter(res, 500, "Data add failed", error);
  }
}

async function reset(req: any, res: any) {
  try {
    await rlClient.query("INSERT INTO barcodes_log SELECT * FROM barcodes");

    await rlClient.query("DELETE FROM barcodes");

    responseSetter(res, 200, "Data reset successful", null);
  } catch (error) {
    console.log("Data reset failed", error);
    responseSetter(res, 500, "Data reset failed", error);
  }
}

export default {
  get,
  getID,
  post,
  reset,
};
