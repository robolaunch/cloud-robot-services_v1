const env = require("../providers/environmentProvider");
const { Client } = require("pg");

const client = new Client({
  host: env.database.host,
  port: env.database.port,
  database: env.su.name,
  user: env.su.user,
  password: env.su.password,
});

module.exports = client;
