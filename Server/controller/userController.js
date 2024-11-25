const dbConnecttion = require("../Db/dbconfig");
const { StatusCodes } = require("http-status-codes");
const jwt = require("jsonwebtoken");
const bcyrpt = require("bcrypt");
const rejester = async (req, res) => {
  const { fname, lname, email, pass, username } = req.body;

  if (!fname || !lname || !email || !pass || !username) {
    // res.send('all fileda are required')
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: "All Fields Are Required." });
  }
  try {
    const selectUser = `SELECT  username,user_id FROM USER where username=?or email=? `;
    //  const users=await dbConnecttion.query(selectUser,[user,email])
    //  res.status(200).json({user:users[0]})

    // same as the above code
    const [users] = await dbConnecttion.query(selectUser, [username, email]);
    if (users.length > 0) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ msg: "User already has an account." });
    }
    //  res.status(200).json({ user: users });
    if (pass.length < 8) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ msg: "Password should be at least 8 characters long." });
    }

    // bcyrpt password
    const salt = await bcyrpt.genSalt(10);
    const hashPassword = await bcyrpt.hash(pass, salt);
    const insertData = `INSERT INTO USER(username,firstname,lastname,email,password) VALUES (?,?,?,?,?)`;
    await dbConnecttion.query(insertData, [
      username,
      fname,
      lname,
      email,
      hashPassword,
    ]);
    res.status(StatusCodes.CREATED).json({ msg: "User created successfully." });
  } catch (error) {

    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "internal server erorr,try again later" });
  }
};

const login = async (req, res) => {
  const { email, pass } = req.body;
  if (!email || !pass) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: "all fileds are required" });
  }

  try {
    const selectemail =
      "SELECT username,password,user_id,firstname FROM USER where email=?";
    const [useremail] = await dbConnecttion.query(selectemail, [email]);

    // res.json({ useremail });
    if (useremail.length === 0) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ msg: "User Not Found" });
    }
    const isMatched = await bcyrpt.compare(pass, useremail[0].password);
    if (!isMatched) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ msg: "password not matched" });
    }
    const username = useremail[0].username;
    const id = useremail[0].user_id;
    const fname = useremail[0].firstname;

    const token = jwt.sign({ username, id }, process.env.JWT_SECRET);
    return res
      .status(StatusCodes.ACCEPTED)
      .json({ msg: "succesfuly login", token, fname });
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "Internal server error,try again later!" });
  }
};

const checkuser = async (req, res) => {
  const { username, id } = req.user;
  res.status(StatusCodes.ACCEPTED).json({ msg: "valid user", username, id });
};

const userInfo = async (req, res) => {
  const { email } = req.body;
  try {
    const infos = "SELECT * FROM USER  ";
    const [userinfos] = await dbConnecttion.query(infos);
    res
      .status(StatusCodes.ACCEPTED)
      .json({ userinfos: userinfos[userinfos?.length - 1] });
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "Internal server error,try again later!" });
  }
};

module.exports = { rejester, login, checkuser, userInfo };
