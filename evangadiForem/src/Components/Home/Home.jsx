import React, { useContext, useEffect, useState } from "react";
import { contextApi } from "../Context/Context";
import style from "./Home.module.css";
import { IoIosArrowForward } from "react-icons/io";
import { Link, useParams } from "react-router-dom";
import { FaUserAlt } from "react-icons/fa";
import { CiSearch } from "react-icons/ci";
import api from "../../axios";
import formatTime from "../formatTime";
import isOnline from "../hooks/isOnline";
function Home() {
  const { userDatas, questionDatas, questionLists, userIcon, loading } =
    useContext(contextApi);
  const [search, setSearch] = useState("");
  const { formatTimes } = formatTime();
  const { checkOnline, online } = isOnline();

  useEffect(() => {
    questionDatas();
    checkOnline();
  }, []);

  // filter online users
  const onlineusers = online
    .filter((user) => user.status === "online")
    .map((user) => user.user_id);
  console.log(onlineusers);

  // get asingle questions

  // search question

  const searchQuestion = questionLists.filter((question) =>
    question.title.toLowerCase().includes(search.toLowerCase())
  );
  console.log(searchQuestion);

  return (
    <div className={style.home}>
      <div className={style.home_conatiner}>
        <div className={style.addquestions_btn}>
          <Link to="/questions">
            <button>Add Questions</button>
          </Link>
          {loading ? <p>Loading...</p> : <p>Username: {userDatas?.username}</p>}
        </div>
        <div className="row mb-5">
          <div className="col-md">
            <h4> All Quesions</h4>
          </div>
          <div class="input-group col-md mt-2">
            <input
              id="search-input"
              type="search"
              className={`${style.search_input} form-control`}
              placeholder="Search anything..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button id="search-button" type="button" class="btn btn-primary">
              <i class="fa fa-search">
                <CiSearch onClick={searchQuestion} />
              </i>
            </button>
          </div>
        </div>

        <hr />
        <div className={style.all_answer_lists}>
          {questionLists.length > 0 ? (
            searchQuestion.map((data, index) => {
              const isUserOnline = onlineusers.includes(data.user_id);
              return (
                <Link to={`/answers/${data.question_id}`} key={index}>
                  <div className={style.questions} key={index}>
                    <div className={style.avater}>
                      <div className={style.avater_img}>
                        <h1>
                          {userIcon && <FaUserAlt />}

                          {isUserOnline && (
                            <small className={style.online_status}></small>
                          )}
                        </h1>
                      </div>
                      <div className={style.user_name}>{data.firstname}</div>
                    </div>
                    <div className={style.titles}>{data.title}</div>
                    <div className={style.arrow}>
                      <IoIosArrowForward />
                      <p className={style.time}>
                        {formatTimes(data.created_at)}
                      </p>
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
