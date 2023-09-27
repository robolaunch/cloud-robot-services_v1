const dbCreateFlow = require("../functions/dbCreateFlow");
const rlClient = require("../clients/dbRobolaunchClient");

async function get(req, res) {
  const selectQuery = "SELECT * FROM barcodes";

  try {
    const result = await rlClient.query(selectQuery);
    const data = result.rows;
    res.status(200).json(data);
  } catch (error) {
    console.error("Veri sorgulanırken hata oluştu:", error);
    res.status(500).send("Veri sorgulanırken hata oluştu.");
  }
}

async function getID(req, res) {
  await res.status(200).send("Response with ID");
}

async function post(req, res) {
  const {
    scanner_id,
    date,
    time,
    barcode,
    location_x,
    location_y,
    location_z,
  } = req.body;

  const insertQuery = `
    INSERT INTO barcodes (scanner_id, date, time, barcode, location_x, location_y, location_z)
    VALUES ($1, $2, $3, $4, $5, $6, $7)
    RETURNING id`;

  const values = [
    scanner_id,
    date,
    time,
    barcode,
    location_x,
    location_y,
    location_z,
  ];

  try {
    const result = await rlClient.query(insertQuery, values);
    const insertedId = result.rows[0].id;
    console.log(`Veri başarıyla eklendi. Eklenen verinin ID'si: ${insertedId}`);
    res.status(200).send("Veri başarıyla eklendi.");
  } catch (error) {
    console.error("Veri eklenirken hata oluştu:", error);
    res.status(500).send("Veri eklenirken hata oluştu.");
  }
}

module.exports = {
  get,
  getID,
  post,
};
