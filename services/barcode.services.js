const rlClient = require("../clients/dbRobolaunchClient");
const responseSetter = require("../functions/responseSetter");

async function get(_, res) {
  const selectQuery = "SELECT * FROM barcodes";

  try {
    const result = await rlClient.query(selectQuery);
    const data = result.rows;
    responseSetter(res, 200, "Data query successful", data);
  } catch (error) {
    console.error("Data query failed", error);
    responseSetter(res, 500, "Data query failed", error);
  }
}

async function getID(req, res) {
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
    console.error("Data query failed", error);
    responseSetter(res, 500, "Data query failed", error);
  }
}

async function post(req, res) {
  const {
    robot_id,
    scanner_id,
    date,
    time,
    barcode,
    location_x,
    location_y,
    location_z,
  } = req.body;

  const checkQuery = "SELECT * FROM barcodes WHERE barcode = $1";
  const checkValues = [barcode];

  try {
    const checkResult = await rlClient.query(checkQuery, checkValues);

    if (checkResult.rowCount > 0) {
      responseSetter(res, 400, `This barcode ${barcode} already exists`, null);
      return;
    }

    const insertQuery = `
      INSERT INTO barcodes (robot_id, scanner_id, date, time, barcode, location_x, location_y, location_z)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      RETURNING id`;

    const insertValues = [
      robot_id,
      scanner_id,
      date,
      time,
      barcode,
      location_x,
      location_y,
      location_z,
    ];

    const result = await rlClient.query(insertQuery, insertValues);
    const insertedId = result.rows[0].id;
    console.log(`Data added successfully ID: ${insertedId}`);

    responseSetter(res, 201, "Data added successfully", null);
  } catch (error) {
    console.error("Data add failed", error);
    responseSetter(res, 500, "Data add failed", error);
  }
}

async function reset(req, res) {
  try {
    const copyQuery = "INSERT INTO barcodes_log SELECT * FROM barcodes";
    await rlClient.query(copyQuery);

    const deleteQuery = "DELETE FROM barcodes";
    await rlClient.query(deleteQuery);

    responseSetter(res, 200, "Data reset successful", null);
  } catch (error) {
    console.error("Data reset failed", error);
    responseSetter(res, 500, "Data reset failed", error);
  }
}

module.exports = {
  get,
  getID,
  post,
  reset,
};
