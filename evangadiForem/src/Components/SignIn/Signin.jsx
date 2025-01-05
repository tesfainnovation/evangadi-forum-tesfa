import React, { useState, useRef, useContext } from "react";
import styles from "./Signin.module.css";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import api from "../../axios";
import toast from "react-hot-toast";
import { contextApi } from "../Context/Context";
import useLogin from "../hooks/useLogin";

export default function Signin({ title }) {
  const [showpass, setShowPass] = useState(false);
  const [login, setLogin] = useState(true);
  const [isClicked, setIsClicked] = useState(false);
  const [user, setUser] = useState("");
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [errColor, setErrColor] = useState("gray");

  const [errText, setErrorText] = useState("");

  const handleChangeLogin = () => {
    setLogin((prev) => !prev);
    setIsClicked((prev) => !prev);
  };
  const {
    email,
    setEmail,
    pass,
    setPass,
    color,
    text,
    handleLogin,
    setLoading,
    loading,
    setText
  } = useLogin();

  const handeleCreateAccount = async (e) => {
    e.preventDefault(e);
    if (!lname || !user || !fname || !email || !pass) {
      setErrColor("red");
      setErrorText("All Fields Are Required.");
      return;
    }

    try {
       setLoading(true)
      await api.post("/user/rejester", {
        username: user,
        fname: fname,
        lname: lname,
        email: email,
        pass: pass,
      });
      setLogin(true);
      setPass("");
      setEmail('')
      setText('')
      setErrColor("");
    } catch (error) {
      setErrColor("red");
      setErrorText(error?.response?.data.msg || "An error occurred try it again");
    }
    finally{
      setLoading(false)
    }
  };

  // styles for the bordered list

  const inputStyle = {
    borderBottom: "2px solid red",
  };
  return (
    <div className={styles.main_wrapper}>
      <div className={styles.main_container}>
        <div className="row">
          <div className={`col-md  ${styles.left} `}>
            <div className={`${isClicked ? styles.animate : styles.animated}`}>
              <h5>{login ? "Login into Your Account " : "Join the Network"}</h5>
              {login ? (
                <p className="text-danger fw-3">{text}</p>
              ) : (
                <p className="text-danger fw-3">{errText}</p>
              )}
              <p className={styles.redirect_text}>
                {login ? "Don’t have an account? " : "Already have account?"}
                <span onClick={handleChangeLogin}>
                  {login ? " Create a new account  " : " Sign in"}
                </span>
              </p>
              <form onSubmit={login ? handleLogin : handeleCreateAccount}>
                {!login && (
                  <div>
                    <div>
                      <label for="user"></label>
                      <input
                        type="text"
                        className={`${styles.usernames} form-control`}
                        id="user"
                        placeholder="userName"
                        value={user}
                        name="username"
                        onChange={(e) => setUser(e.target.value)}
                        onClick={{ styles: { inputStyle } }}
                        style={{ border: `1px solid ${errColor}` }}
                      />
                    </div>
                    <div className="form-group row">
                      <div className="col-md">
                        <label for="fname"></label>
                        <input
                          type="text"
                          className={`${styles.usernames} form-control`}
                          id="fname"
                          placeholder="First Name"
                          value={fname}
                          name="fname"
                          onChange={(e) => setFname(e.target.value)}
                          style={{ border: `1px solid ${errColor}` }}
                        />
                      </div>
                      <div className="col-md">
                        <label for="lname"></label>
                        <input
                          type="text"
                          className={`${styles.usernames} form-control`}
                          id="lname"
                          placeholder="Last Name"
                          value={lname}
                          name="lname"
                          onChange={(e) => setLname(e.target.value)}
                          style={{ border: `1px solid ${errColor}` }}
                        />
                      </div>
                    </div>
                  </div>
                )}
                <div className="form-group">
                  <label for="email"></label>
                  <input
                    type="email"
                    className={`${styles.usernames} form-control`}
                    id="email"
                    placeholder="Email"
                    value={email}
                    name="email"
                    onChange={(e) => setEmail(e.target.value)}
                    style={{ border: `1px solid ${login ? color : errColor}` }}
                  />
                </div>
                <div className={`form-group ${styles.password}`}>
                  <label for="pwd"></label>
                  <input
                    type={showpass ? "text" : "password"}
                    className={`${styles.usernames} form-control`}
                    id="pwd"
                    placeholder="Password"
                    value={pass}
                    name="pass"
                    onChange={(e) => setPass(e.target.value)}
                    style={{ border: `1px solid ${login ? color : errColor}` }}
                  />
                  <div
                    className={styles.eye_icon}
                    onClick={() => setShowPass((prev) => !prev)}
                  >
                    {showpass ? <FaEye /> : <FaEyeSlash />}
                  </div>
                </div>
                <div className="mt-3">
                  <small className={styles.forgot_pass} mt-5>
                    Forgot Password?
                  </small>
                </div>

                <br />
                <button type="submit" className={styles.signin_btn}>
                  {loading
                    ? "please wait..."
                    : login
                    ? "Login"
                    : "Agree & Join"}
                </button>
              </form>
            </div>
          </div>
          <div className={`col-md ${styles.right}`}>
            <p style={{ color: "#FE8402", marginTop: "20px" }}>About</p>
            <h1>Evangadi Networks</h1>
            <p>
              No matter what stage of life you are in, whether you’re just
              starting elementary school or being promoted to CEO of a Fortune
              500 company, you have much to offer to those who are trying to
              follow in your footsteps.
            </p>

            <p>
              Wheather you are willing to share your knowledge or you are just
              looking to meet mentors of your own, please start by joining the
              network here.
            </p>

            <a href="https://www.evangadi.com/" target="_blank">
              <button className={`${styles.account_btn}`}>How It Works</button>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
