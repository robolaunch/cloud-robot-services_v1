import { IEnvrionment } from "../interfaces/interfaces";
import dotenv from "dotenv";
dotenv.config();

const env: IEnvrionment = {
  database: {
    host: process.env.DATABASE_HOST!,
    port: parseInt(process.env.DATABASE_PORT!),
  },
  su: {
    name: process.env.DATABASE_SU_NAME!,
    user: process.env.DATABASE_SU_USER!,
    password: process.env.DATABASE_SU_PASSWORD!,
  },
  rl: {
    name: process.env.DATABASE_RL_NAME!,
    user: process.env.DATABASE_RL_USER!,
    password: process.env.DATABASE_RL_PASSWORD!,
  },
  application: {
    port: parseInt(process.env.APPLICATION_PORT!),
  },
  robot: {
    port: parseInt(process.env.ROBOT_PORT!),
  },
};

export default env;
