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
    console.log("[POSTGRE DB] Created robolaunch superuser");
  } catch (err: any) {
    console.log(
      err?.code === "42710" ? "[POSTGRE DB] Superuser already exists" : err
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
    console.log(`[POSTGRE DB] Created ${env.rl.name} database`);
  } catch (err: any) {
    console.log(
      err?.code === "42P04" ? "[POSTGRE DB] Database already exists" : err
    );
  }
}

async function createTables() {
  try {
    await rlClient.query(`
    CREATE TABLE barcodes (
    scanner_id INTEGER,
    time INTEGER,
    barcode TEXT,
    location_x FLOAT,
    location_y FLOAT,
    location_z FLOAT)`);
    console.log("[POSTGRE DB] Created `barcodes` table");

    await rlClient.query(`
    CREATE TABLE barcodes_log (
    scanner_id INTEGER,
    time INTEGER,
    barcode TEXT,
    location_x FLOAT,
    location_y FLOAT,
    location_z FLOAT)`);
    console.log("[POSTGRE DB] Created `barcodes_log` table");

    await rlClient.query(`
  CREATE TABLE tasks (
    task_id TEXT,
    task_name TEXT,
    task_json TEXT
  )
`);
    console.log("[POSTGRE DB] Created `tasks` table");

    await rlClient.query(`
  CREATE TABLE tasks_log (
    time TEXT,
    method TEXT,
    log TEXT
  )
`);
    console.log("[POSTGRE DB] Created `tasks_log` table");
  } catch (err: any) {
    console.log(
      err.code === "42P07" ? "[POSTGRE DB] Tables already exists" : err
    );
  }
}

export default async function dbCreateFlow() {
  try {
    await suClient.connect();
    await createSuperUser();
    await createDatabase();
    await suClient.end();
    await rlClient.connect();
    await createTables();
  } catch (error) {
    console.log("[POSTGRE DB] Error connecting/creating database");
    throw error;
  }
}
