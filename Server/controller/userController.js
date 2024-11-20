const dbConnecttion = require("../Db/dbconfig");
const { StatusCodes } = require("http-status-codes");
const jwt = require("jsonwebtoken");
const bcyrpt = require("bcrypt");
const rejester = async (req, res) => {
  const { fname, lname, emial, pass, username } = req.body;

  if (!fname || !lname || !emial || !pass || !username) {
    // res.send('all fileda are required')
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: "all filed required" });
  }
  try {
    const selectUser = `SELECT  username,user_id FROM USER where username=?or emial=? `;
    //  const users=await dbConnecttion.query(selectUser,[user,email])
    //  res.status(200).json({user:users[0]})

    // same as the above code
    const [users] = await dbConnecttion.query(selectUser, [username, emial]);
    if (users.length > 0) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ msg: "user have alreday have an account" });
    }
    //  res.status(200).json({ user: users });
    if (pass.length < 8) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ msg: "password should > 8 character" });
    }

    // bcyrpt password
    const salt = await bcyrpt.genSalt(10);
    const hashPassword = await bcyrpt.hash(pass, salt);
    const insertData = `INSERT INTO USER(username,firstname,lastname,emial,password) VALUES (?,?,?,?,?)`;
    await dbConnecttion.query(insertData, [
      username,
      fname,
      lname,
      emial,
      hashPassword,
    ]);
    res.status(StatusCodes.CREATED).json({ msg: "user crated", user: users });
  } catch (error) {
    console.log(error.message);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "internal server erorr,try again later" });
  }
};

const login = async (req, res) => {
  const { emial, pass } = req.body;
  if (!emial || !pass) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: "all fileds are required" });
  }

  try {
    const selectemail =
      "SELECT username,password,user_id FROM USER where emial=?";
    const [useremial] = await dbConnecttion.query(selectemail, [emial]);

    //  res.json({useremial})
    if (useremial.length === 0) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ msg: "user not found" });
    }
    const isMatched = await bcyrpt.compare(pass, useremial[0].password);
    if (!isMatched) {
      return res.json({ msg: "password not matched" });
    }
    const username = useremial[0].username;
    const id = useremial[0].user_id;

    const token = jwt.sign({ username, id }, process.env.JWT_SECRET);
    res.status(StatusCodes.ACCEPTED).json({ msg: "succesfuly login", token });
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "Internal server error,try again later!" });
  }
};

const checkuser = async (req, res) => {
 
  const {username,id}=req.user
   res.status(StatusCodes.ACCEPTED).json({ msg:'valid user' ,username, id });
};

module.exports = { rejester, login, checkuser };
