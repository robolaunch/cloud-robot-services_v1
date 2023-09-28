import env from "../providers/environmentProvider";
import { Client } from "pg";

const client = new Client({
  host: env.database.host,
  port: env.database.port,
  database: env.rl.name,
  user: env.rl.user,
  password: env.rl.password,
});

export default client;
