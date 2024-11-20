const express = require("express");
const dbConnecttion = require("./Db/dbconfig");
const cors = require("cors");
const router = require("./routes/userRoute");
require("dotenv").config();
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const port = 3000;
// app.get("/user", (req, res) => {
//   const createUserTable = `CREATE TABLE  IF NOT EXISTS USER(
//   user_id INT AUTO_INCREMENT PRIMARY KEY,
//   username VARCHAR(25) NOT NULL,
//   firstname VARCHAR(25) NOT NULL,
//   lastname VARCHAR(25) NOT NULL,
//   emial VARCHAR(25) NOT NULL,
//   password VARCHAR(100) NOT NULL

//   )`;
//   database.query(createUserTable, (err) => console.log(err));
//   res.send("tabled created");
// });

// userrouter middlware

app.use("/Api/user", router);

// QuestionRoute middleware

//

const start = async () => {
  try {
    const result = await dbConnecttion.execute("select 'test'");
    console.log(result);
    app.listen(port);
    console.log("databse connected");
    console.log("server is running");
  } catch (error) {
    console.log(error.message);
  }
};
start();

// app.post("/rejester", (req, res) => {
//   const { fname, lname, email, pass, user } = req.body;
//   const insertData = `INSERT INTO USER(username,firstname,lastname,emial,password) VALUES (?,?,?,?,?)`;
//   database.query(insertData, [user, fname, lname, email, pass], (err, data) =>
//     err ? console.log(err) : console.log(data)
//   );
//   res.send("account created");
// });

// app.get("/username", (req, res) => {
//   const selectFile = `SELECT * FROM USER`;

//   database.query(selectFile, (err, data) => {
//     if (err) {
//       console.error("Error fetching data:", err);
//       return res.status(500).json({ error: "Internal Server Error" });
//     }
//     console.log("Data retrieved successfully:", data);
//     res.status(200).json(data);
//   });
// });
