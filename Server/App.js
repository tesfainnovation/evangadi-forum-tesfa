const express = require("express");
const dbConnecttion = require("./Db/dbconfig");
const cors = require("cors");
const router = require("./routes/userRoute");
const questionRouter = require("./routes/questionRoute");
const answerRoute = require("./routes/answerRoute");

require("dotenv").config();
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const port = 3000;
app.get("/user", (req, res) => {
  const createUserTable = `CREATE TABLE  IF NOT EXISTS USER(
  user_id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(25) NOT NULL,
  firstname VARCHAR(25) NOT NULL,
  lastname VARCHAR(25) NOT NULL, 
  emial VARCHAR(25) NOT NULL,
  password VARCHAR(100) NOT NULL
  
  )`;
  const questiontable = ` CREATE TABLE IF NOT EXISTS Questions(
   id INT AUTO_INCREMENT,
   question_id VARCHAR(200) NOT NULL UNIQUE ,
   title VARCHAR(100) NOT NULL,
   descrbition VARCHAR(255) NOT NULL,
   tag VARCHAR(255) ,
   user_id INT NOT NULL ,
   PRIMARY KEY( id,  question_id),
   FOREIGN KEY(user_id) REFERENCES USER(user_id) 
  )`;
  const answerQuestion = `CREATE TABLE IF NOT EXISTS Answers(
  answer_id INT AUTO_INCREMENT PRIMARY KEY,
  answer VARCHAR(255) NOT NULL,
  user_id INT NOT NULL,
  question_id VARCHAR(200) NOT NULL,
     FOREIGN KEY(user_id) REFERENCES USER(user_id) ,
      FOREIGN KEY(question_id) REFERENCES Questions( question_id ) 
  )`;
  dbConnecttion.query(createUserTable);
  dbConnecttion.query(questiontable);
  dbConnecttion.query(answerQuestion);
  res.send("tabled created");
});

// userrouter middlware

app.use("/Api/user", router);

// QuestionRoute middleware
app.use("/Api", questionRouter);
// answer route
app.use("/Api", answerRoute);

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
