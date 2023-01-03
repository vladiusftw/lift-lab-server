require("dotenv").config();
const { Pool } = require("pg");

const sql = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
});

module.exports = sql;
