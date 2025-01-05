import React, { useContext } from "react";
import styles from "./Header.module.css";
import logo from "../../assets/images/logo.png";
import { Link, useNavigate } from "react-router-dom";
import { contextApi } from "../Context/Context";

function Header() {
  const navigate = useNavigate();
  const { userDatas, setUserDatas, token } = useContext(contextApi);
  const handleLogout = () => {
    localStorage.removeItem("token");
    setUserDatas({});
    window.scrollTo(0, 0);
    navigate("/");
  };
  const toTop = () => {
    window.scrollTo(0, 0);
  };
  return (
    <div className={styles.header_wrapper}>
      <div className={styles.header_container}>
        <div className={styles.header_logo}>
          <Link to={token && `/home`} onClick={toTop}>
            <img src={logo} alt="logo" width={"180px"} />
          </Link>
        </div>
        <div className={styles.left_menu}>
          <ul>
            <li className={styles.home}>
              <Link to="/home">Home</Link>
            </li>
            <li className={styles.how}>
              <a href="https://www.evangadi.com/" target="_blank">
                How it works
              </a>
            </li>

            <li onClick={handleLogout}>
              <button className={styles.logout}>
                {token ? "Logout" : "SignUp"}
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Header;
