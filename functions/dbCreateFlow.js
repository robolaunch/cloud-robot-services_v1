const suClient = require("../clients/dbSuperUserClient");
const rlClient = require("../clients/dbRobolaunchClient");
const env = require("../providers/environmentProvider");

async function createSuperUser() {
  try {
    await suClient.query(`
    CREATE ROLE ${env.rl.user} WITH
    LOGIN
    SUPERUSER
    CREATEDB
    CREATEROLE
    INHERIT
    NOREPLICATION
    CONNECTION LIMIT -1
    PASSWORD '${env.rl.password}';`);
    console.log("CREATED robolaunch superuser");
  } catch (err) {
    console.error(err);
  }
}

async function createDatabase() {
  try {
    await suClient.query(`
    CREATE DATABASE ${env.rl.name}
    WITH
    OWNER = ${env.rl.user}
    ENCODING = 'UTF8'
    LOCALE_PROVIDER = 'libc'
    CONNECTION LIMIT = -1
    IS_TEMPLATE = False;`);
    console.log(`CREATED ${env.rl.name} database`);
  } catch (err) {
    console.error(err);
  }
}

async function createTables() {
  try {
    await rlClient.query(`
    CREATE TABLE barcodes (
    id SERIAL PRIMARY KEY,
    robot_id INTEGER,
    scanner_id INTEGER,
    date DATE,
    time TIME,
    barcode VARCHAR(255),
    location_x FLOAT,
    location_y FLOAT,
    location_z FLOAT)`);
    console.log("CREATED barcodes table");

    await rlClient.query(`
    CREATE TABLE barcodes_log (
    id SERIAL PRIMARY KEY,
    robot_id INTEGER,
    scanner_id INTEGER,
    date DATE,
    time TIME,
    barcode VARCHAR(255),
    location_x FLOAT,
    location_y FLOAT,
    location_z FLOAT)`);
    console.log("CREATED barcodes_log table");
  } catch (err) {
    console.error(err);
  }
}

async function creatorFlow() {
  await suClient.connect();
  await createSuperUser();
  await createDatabase();
  await suClient.end();
  await rlClient.connect();
  await createTables();
}

module.exports = creatorFlow;
