import React, { useContext, useEffect, useState } from "react";
import { contextApi } from "../Context/Context";
import style from "./Home.module.css";
import { IoIosArrowForward } from "react-icons/io";
import { Link, useParams } from "react-router-dom";
import { FaUserAlt } from "react-icons/fa";
function Home() {
  const { userDatas, questionDatas, questionLists, userIcon } =
    useContext(contextApi);
  useEffect(() => {
    questionDatas();
  }, []);

  return (
    <div className={style.home}>
      <div className={style.home_conatiner}>
        <div className={style.addquestions_btn}>
          <Link to="/questions">
            <button>Add Questions</button>
          </Link>

          <p>Username:{userDatas?.username}</p>
        </div>
        <h4>Quesions</h4>
        <hr />

        <div>
          {questionLists.length > 0 ? (
            questionLists.map((data, index) => {
              return (
                <Link to={`/answers/${data.question_id}`}>
                  <div className={style.questions} key={index}>
                    <div className={style.avater}>
                      <div className={style.avater_img}>
                        {/* <img src={user2} alt="" width={"70px"} /> */}
                        <h1>{userIcon && <FaUserAlt />}</h1>
                      </div>
                      <div>{data.firstname}</div>
                    </div>
                    <div>{data.title}</div>
                    <div className={style.arrow}>
                      <IoIosArrowForward />
                    </div>
                  </div>
                </Link>
              );
            })
          ) : (
            <h3>NO Question Yet !!</h3>
          )}
        </div>

        <hr />
      </div>
    </div>
  );
}

export default Home;
