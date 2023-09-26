const env = require("../providers/environmentProvider");
const { Client } = require("pg");

const client = new Client({
  host: env.database.host,
  port: env.database.port,
  database: env.rl.name,
  user: env.rl.user,
  password: env.rl.password,
});

module.exports = client;
