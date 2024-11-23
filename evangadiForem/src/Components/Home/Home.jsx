import React, { useContext, useEffect, useState } from "react";
import { contextApi } from "../Context/Context";
import style from "./Home.module.css";
import { IoIosArrowForward } from "react-icons/io";
import user2 from "../../assets/images/user.jpg";
import user1 from '../../assets/images/black.jpg'
import { Link } from "react-router-dom";

function Home() {
  const [data, setDatas] = useState([]);
  const { userDatas } = useContext(contextApi);
  const[user,setUser]=useState(true)

  console.log(userDatas);

  return (
    <div className={style.home}>
      {/* {
    !userDatas &&<div>
      <h1>loading....</h1>
    </div>
   } */}

      <div className={style.home_conatiner}>
        <div className={style.addquestions_btn}>
          <Link to="/questions">
            <button>Add Questions</button>
          </Link>

          <p>Username:{userDatas.username}</p>
        </div>
        <h4>Quesions</h4>
        <hr />
        <Link to='/answers'>
          <div>
            <div
              className={style.questions}
              onMouseOver={() => setUser((prev) => !prev)}
            >
              <div className={style.avater}>
                <div className={style.avater_img}>
                  <img src={user ? user2 : user1} alt="" width={"70px"} />
                </div>
                <div>{userDatas.username}</div>
              </div>
              <div>what is jwt</div>
              <div className={style.arrow}>
                <IoIosArrowForward />
              </div>
            </div>
            <div
              className={style.questions}
              onMouseOver={() => setUser((prev) => !prev)}
            >
              <div className={style.avater}>
                <div className={style.avater_img}>
                  <img src={user ? user2 : user1} alt="" width={"70px"} />
                </div>
                <div>{userDatas.username}</div>
              </div>
              <div>what is jwt</div>
              <div className={style.arrow}>
                <IoIosArrowForward />
              </div>
            </div>
          </div>
        </Link>
        <hr />
      </div>
    </div>
  );
}

export default Home;
