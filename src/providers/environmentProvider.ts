require("dotenv").config();

const env: {
  database: {
    host: string;
    port: number;
  };
  su: {
    name: string;
    user: string;
    password: string;
  };
  rl: {
    name: string;
    user: string;
    password: string;
  };
} = {
  database: {
    host: process.env.DATABASE_HOST!,
    port: Number(process.env.DATABASE_PORT!),
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
};

export default env;
