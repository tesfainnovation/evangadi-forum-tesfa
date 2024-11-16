import React from "react";
import style from "./Footer.module.css";
import logo from "../../assets/images/eva.png";
import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";

function Footer() {
  return (
    <div className={style.footer_wrapper}>
      <div className={style.footer_container}>
        <div className="row">
          <div className={`col-md  ${style.footer_icon}`}>
            <div>
              <img src={logo} alt="" width={"200px"} />
            </div>
            <div className={style.icons}>
              <a href="">
                <FaFacebook />
              </a>
              <a href="">
                {" "}
                <FaInstagram />
              </a>
              <a href="">
                {" "}
                <FaYoutube />
              </a>
            </div>
          </div>
          <div className={`col-md ${style.terms}`}>
            <h3>Useful Link</h3>
            
                <a href="">Terms of Services</a><br/>
             
                <a href="">+1-202-386-2702</a>
             
          </div>
          <div className="col-md">
            <h3>Contact Info</h3>
         
                <a href="">support@evangadi.com</a><br/>
           
                <a href="">+1-202-386-2702</a>
             
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
