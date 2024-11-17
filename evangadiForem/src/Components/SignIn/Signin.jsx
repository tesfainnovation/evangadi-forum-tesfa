import React, { useState } from "react";
import styles from "./Signin.module.css";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Signin({ title }) {
  const [showpass, setShowPass] = useState(false);
  const [login, setLogin] = useState(true);
  const [isClicked, setIsClicked] = useState(false);
  const [user, setUser] = useState("");

  const [name, setName] = useState("");
  const [fname, setFname] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [color, setColor] = useState("gray");

  const handleChangeLogin = () => {
    setLogin((prev) => !prev);
    setIsClicked((prev) => !prev);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (user || name || fname || email || pass == "") {
      setColor("red");
    }
  };
  return (
    <div className={styles.main_wrapper}>
      <div className={styles.main_container}>
        <div className="row">
          <div className={`col-md  ${styles.left} `}>
            <div className={`${isClicked ? styles.animate : styles.animated}`}>
              <h5>{login ? "Login into Your Account " : "Join the Network"}</h5>
              <p className={styles.redirect_text}>
                {login ? "Don’t have an account? " : "Already have account?"}
                <span onClick={handleChangeLogin}>
                  {login ? " Create a new account  " : " Sign in"}
                </span>
              </p>
              <form onSubmit={handleLogin}>
                {!login && (
                  <div>
                    <div>
                      <label for="user"></label>
                      <input
                        type="text"
                        className="form-control"
                        id="user"
                        placeholder="userName"
                        value={user}
                        onChange={(e) => setUser(e.target.value)}
                        style={{ border: "1px solid red" }}
                      />
                    </div>
                    <div className="form-group row">
                      <div className="col-md">
                        <label for="fname"></label>
                        <input
                          type="text"
                          className="form-control"
                          id="fname"
                          placeholder="First Name"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                        />
                      </div>
                      <div className="col-md">
                        <label for="lname"></label>
                        <input
                          type="text"
                          className="form-control"
                          id="lname"
                          placeholder="Last Name"
                          value={fname}
                          onChange={(e) => setFname(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                )}
                <div className="form-group">
                  <label for="email"></label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className={`form-group ${styles.password}`}>
                  <label for="pwd"></label>
                  <input
                    type={showpass ? "text" : "password"}
                    className="form-control xx"
                    id="pwd"
                    placeholder="Password"
                    value={pass}
                    onChange={(e) => setPass(e.target.value)}
                  />
                  <div
                    className={styles.eye_icon}
                    onClick={() => setShowPass((prev) => !prev)}
                  >
                    {showpass ? <FaEye /> : <FaEyeSlash />}
                  </div>
                </div>
                <small className={styles.forgot_pass}>Forgot Password?</small>
                <br />
                <button type="submit" className={styles.signin_btn}>
                  {login ? "Login" : "Agree & Join"}
                </button>
              </form>
            </div>
          </div>
          <div className={`col-md ${styles.right}`}>
            <p style={{ color: "#FE8402" }}>About</p>
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
            <button className={`${styles.account_btn}`}>How It Works</button>
          </div>
        </div>
      </div>
    </div>
  );
}
