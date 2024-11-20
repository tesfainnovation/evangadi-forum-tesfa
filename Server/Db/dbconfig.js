const mysql = require("mysql2");
require("dotenv").config();
const dbConnecttion = mysql.createPool({
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  host: "localhost",
});

console.log(process.env.USER);

console.log(process.env.JWT_SECRET);

// dbConnecttion.execute('select',((err,result)=>{
// if(err){
//     console.log(err)
// }
// else{
//     console.log(result)
// }
// }))

module.exports = dbConnecttion.promise();
