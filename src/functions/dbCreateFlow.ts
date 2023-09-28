import rlClient from "../clients/dbRobolaunchClient";
import suClient from "../clients/dbSuperUserClient";
import env from "../providers/environmentProvider";

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
    console.log(
      "POSTGRE DB | --------- | Status: Created robolaunch superuser"
    );
  } catch (err: any) {
    console.log(
      err?.code === "42710"
        ? "POSTGRE DB | --------- | Status: Superuser already exists"
        : err
    );
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
    console.log(
      `POSTGRE DB | --------- | Status: Created ${env.rl.name} database`
    );
  } catch (err: any) {
    console.log(
      err?.code === "42P04"
        ? "POSTGRE DB | --------- | Status: Database already exists"
        : err
    );
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
    console.log("POSTGRE DB | --------- | Status: Created `barcodes` table");

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
    console.log(
      "POSTGRE DB | --------- | Status: Created `barcodes_log` table"
    );
  } catch (err: any) {
    console.log(
      err.code === "42P07"
        ? "POSTGRE DB | --------- | Status: Tables already exists"
        : err
    );
  }
}

export default async function dbCreateFlow() {
  await suClient.connect();
  await createSuperUser();
  await createDatabase();
  await suClient.end();
  await rlClient.connect();
  await createTables();
}
