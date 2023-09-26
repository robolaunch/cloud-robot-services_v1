const client = require("./clients/databaseSuperUserClient");

async function creatorFlow() {
  if (!client._connected) {
    await client.connect();
  }
  await createSuperUser();
  await createDatabase();
  await createTables();
}

async function createSuperUser() {
  try {
    await client.query(`
    CREATE ROLE robolaunch WITH
    LOGIN
    SUPERUSER
    CREATEDB
    CREATEROLE
    INHERIT
    REPLICATION
    CONNECTION LIMIT -1
    PASSWORD 'robolaunch'
                `);
    console.log("CREATED robolaunch superuser");
  } catch (err) {
    console.error(err);
  }
}

async function createDatabase() {
  try {
    await client.query(`
    CREATE DATABASE rldb
    WITH
    OWNER = robolaunch
    ENCODING = 'UTF8'
    LOCALE_PROVIDER = 'libc'
    CONNECTION LIMIT = -1
    IS_TEMPLATE = False
                `);
    console.log("CREATED rldb database");
  } catch (err) {
    console.error(err);
  }
}

async function createTables() {
  try {
    await client.query(`
    CREATE TABLE barcodes (
    id SERIAL PRIMARY KEY,
    scanner_id INTEGER,
    date DATE,
    barcode VARCHAR(255),
    location_x FLOAT,
    location_y FLOAT,
    location_z FLOAT)
                `);
    console.log("CREATED barcodes table");

    await client.query(`
    CREATE TABLE barcodes_log (
    id SERIAL PRIMARY KEY,
    scanner_id INTEGER,
    date DATE,
    barcode VARCHAR(255),
    location_x FLOAT,
    location_y FLOAT,
    location_z FLOAT)
                `);
    console.log("CREATED barcodes_log table");
  } catch (err) {
    console.error(err);
  }
}

async function creatorFlow() {
  try {
    if (!client._connected) {
      await client.connect();
    }
    await createSuperUser();
    await createDatabase();
    await createTables();
  } catch (err) {
    console.error(err);
  }
}

module.exports = creatorFlow;
