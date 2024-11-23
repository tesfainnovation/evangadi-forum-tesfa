import React, { useContext } from "react";
import css from "./Answer.module.css";
import user1 from '../../../assets/images/black.jpg'
import { contextApi } from "../../Context/Context";
import { FaCircleArrowRight } from "react-icons/fa6";

function Answer() {
  const { userDatas } = useContext(contextApi);
  return (
    <div className={css.answer_wrapper}>
      <div className={css.answer_container}>
        <h4>Questions</h4>
        <h6>
          <span className="me-3 text-dark">
            <FaCircleArrowRight />
          </span>
          what is jwt
        </h6>
        <hr />
        <div>
          <h3 className="text-center mb-4">Answers from the Community</h3>
          <hr />
        </div>
        <div className={css.answer_from_comminuty}>
          <div className={css.answers_page}>
            <div className={css.avater_image}>
              <img src={user1} alt="" width={"70px"} />
              <div>{userDatas.username}</div>
            </div>
            <div>
              <p>it is used for routung purpose</p>
            </div>
          </div>{" "}
          <div className={css.answers_page}>
            <div className={css.avater_image}>
              <img src={user1} alt="" width={"70px"} />
              <div>{userDatas.username}</div>
            </div>
            <div>
              <p>it is used for routung purpose</p>
            </div>
          </div>{" "}
          <div className={css.answers_page}>
            <div className={css.avater_image}>
              <img src={user1} alt="" width={"70px"} />
              <div>{userDatas.username}</div>
            </div>
            <div>
              <p>it is used for routung purpose</p>
            </div>
          </div>
        </div>

        <hr />

        <div className={css.answer_form}>
          <h4 className="text-center mb-5">Answer The ToP Questions</h4>
          <form action="">
            <textarea
              className="form-control"
              rows="6"
              id="details"
              placeholder="Your Answer"
            ></textarea>

            <button type="submit">Post Your Answer</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Answer;
