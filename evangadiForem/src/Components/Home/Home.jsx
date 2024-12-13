import React, { useContext, useEffect, useState } from "react";
import { contextApi } from "../Context/Context";
import style from "./Home.module.css";
import { IoIosArrowForward } from "react-icons/io";
import { Link, useParams } from "react-router-dom";
import { FaUserAlt } from "react-icons/fa";
import { CiSearch } from "react-icons/ci";
function Home() {
  const { userDatas, questionDatas, questionLists, userIcon, loading } =
    useContext(contextApi);
    const[search,setSearch]=useState('')
 

  useEffect(() => {
    questionDatas();
  }, []);

  const searchQuestion = questionLists.filter(question =>
    question.title.toLowerCase().includes(search.toLowerCase())


  );



  return (
    <div className={style.home}>
      <div className={style.home_conatiner}>
        <div className={style.addquestions_btn}>
          <Link to="/questions">
            <button>Add Questions</button>
          </Link>

          {loading ? <p>Loading...</p> : <p>Username: {userDatas?.username}</p>}
        </div>
        <div className="row mb-5" >
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
              <i class="fa fa-search" >
                <CiSearch onClick={searchQuestion} />
              </i>
            </button>
          </div>
        </div>

        <hr />
        <div>
          {questionLists.length > 0 ? (
            searchQuestion.map((data, index) => {
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
