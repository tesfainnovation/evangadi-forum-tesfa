const mysql = require("mysql2");
require("dotenv").config();
const dbConnecttion = mysql.createPool({
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  host: "localhost",
});



module.exports = dbConnecttion.promise();
