import React, { useContext, useEffect, useState } from "react";
import { contextApi } from "../Context/Context";
import style from "./Home.module.css";
import { IoIosArrowForward } from "react-icons/io";
import { Link } from "react-router-dom";
import { FaUserAlt } from "react-icons/fa";
import { CiSearch } from "react-icons/ci";
import api from "../../axios";
import formatTime from "../formatTime";
import isOnline from "../hooks/isOnline";
import { ClipLoader } from "react-spinners";

function Home() {
  const { userDatas, questionDatas, questionLists, userIcon, loading, load } =
    useContext(contextApi);
  const [search, setSearch] = useState("");
  const { formatTimes } = formatTime();
  const { checkOnline, online } = isOnline();

  useEffect(() => {
    questionDatas();
    checkOnline();
  }, []);

  // Scroll to the top of the page
  const top = () => {
    window.scrollTo(0, 0);
  };

  // Filter online users
  const onlineusers = online
    .filter((user) => user.status === "online")
    .map((user) => user.user_id);

  // Search question logic
  const searchQuestion = questionLists.filter((question) =>
    question.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className={style.home}>
      <div className={style.home_conatiner}>
        <div className={style.addquestions_btn}>
          <Link to="/questions">
            <button>Add Questions</button>
          </Link>
          {loading ? (
            <p>Loading...</p>
          ) : (
            <p>
              Username: <span>{userDatas?.username}</span>
            </p>
          )}
        </div>
        <div className="row mb-5">
          <div className="col-md">
            <h4>All Questions</h4>
          </div>
          <div className="input-group col-md mt-2">
            <input
              id="search-input"
              type="search"
              className={`${style.search_input} form-control`}
              placeholder="Search anything..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          
          </div>
        </div>

        <hr />
        {load ? (
          <h3 className={style.home_loading}>
            <ClipLoader />
          </h3>
        ) : (
          <div className={style.all_answer_lists}>
            {searchQuestion.length > 0 ? (
              searchQuestion.map((data, index) => {
                const isUserOnline = onlineusers.includes(data.user_id);
                return (
                  <Link
                    to={`/answers/${data.question_id}`}
                    key={index}
                    onClick={top}
                  >
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
                        <p className={style.arrow_icon}>
                          <IoIosArrowForward />
                        </p>

                        <p className={style.time}>
                          {formatTimes(data.created_at)}
                        </p>
                      </div>
                    </div>
                  </Link>
                );
              })
            ) : (
              <h3 className={style.no_questions}>No results found</h3>
            )}
          </div>
        )}
       
      </div>
    </div>
  );
}

export default Home;
