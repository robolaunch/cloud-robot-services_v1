require("dotenv").config();

module.exports = {
  database: {
    host: process.env.DATABASE_HOST,
    port: process.env.DATABASE_PORT,
  },
  su: {
    name: process.env.DATABASE_SU_NAME,
    user: process.env.DATABASE_SU_USER,
    password: process.env.DATABASE_SU_PASSWORD,
  },
  rl: {
    name: process.env.DATABASE_RL_NAME,
    user: process.env.DATABASE_RL_USER,
    password: process.env.DATABASE_RL_PASSWORD,
  },
};
