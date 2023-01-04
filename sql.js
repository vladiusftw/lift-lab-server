require("dotenv").config();
const { Pool, types } = require("pg");

const sql = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
});
types.setTypeParser(1700, (x) => parseFloat(x));

module.exports = sql;
