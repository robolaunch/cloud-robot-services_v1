import responseSetter from "../functions/responseSetter";
import rlClient from "../clients/dbRobolaunchClient";

async function get(req: any, res: any) {
  const selectQuery = `SELECT location_x, location_y, location_z, COUNT(*) as count
  FROM barcodes
  GROUP BY location_x, location_y, location_z
  ORDER BY location_x, location_y, location_z;`;

  try {
    const result = await rlClient.query(selectQuery);
    const data = result.rows;
    responseSetter(res, 200, "Data query successful", data);
  } catch (error) {
    console.log("Data query failed", error);
    responseSetter(res, 500, "Data query failed", error);
  }
}

export default {
  get,
};
