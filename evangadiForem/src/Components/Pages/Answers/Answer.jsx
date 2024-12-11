import React, { useContext, useEffect, useState } from "react";
import css from "./Answer.module.css";
import user1 from "../../../assets/images/black.jpg";
import { contextApi } from "../../Context/Context";
import { FaCircleArrowRight } from "react-icons/fa6";
import { useParams } from "react-router-dom";
import api from "../../../axios";
import { toast } from "react-toastify";
import { FaPen } from "react-icons/fa6";
import { AiOutlineLike } from "react-icons/ai";
import { MdDelete } from "react-icons/md";
import { BiSolidLike } from "react-icons/bi";
import { FaUserAlt } from "react-icons/fa";
import useAnswers from "../../hooks/useAnswers";
import useSendAnswers from "../../hooks/useSendAnswers";
import useDelete from "../../hooks/useDelete";
import EmojiPicker from "emoji-picker-react";
import { MdEmojiEmotions } from "react-icons/md";

function Answer() {
  const { userDatas, questionLists, userIcon } = useContext(contextApi);
    const [emoji, setEmoji] = useState(false);
  const { answers, like, title, setLike, allQuestions } = useAnswers();
  //  const {sendAnswers, answerFiled, setAnswerFiled }=useSendAnswers()
  //  const{deleteAnswer}=useDelete()
  const [answerFiled, setAnswerFiled] = useState("");
  // const { allQuestions } = useAnswers();
  const { question_id } = useParams();

  const sendAnswers = async (e) => {
    e.preventDefault();

    if (!answerFiled) {
      toast.error("all filed required!");
    }
    try {
      const token = localStorage.getItem("token");
      const answers = await api.post(
        `/answers/${question_id}`,
        {
          answer: answerFiled,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(answers);
      allQuestions();
      setAnswerFiled("");
    } catch (error) {
      console.log(error);
    }
  };

  // enable enter key

  const handleEnterKey = (e) => {
    if (e.key === "Enter") {
      e.preventDefault(); // Prevents default Enter behavior (like adding a newline in the textarea)
      sendAnswers(e);
    }
  };
  // delete function

  const toggleLike = (id) => {
    setLike((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const deleteAnswer = async (answer_id) => {
    const token = localStorage.getItem("token");
    try {
      await api.delete(`/delete/${answer_id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success("answer deleted");
      allQuestions();
    } catch (error) {
      console.log(error);
      toast.error("failed to delete the answer");
    }
  };


  // emoji

    const hadleEmojies = (e) => {
      console.log(e.emoji);
      setAnswerFiled([answerFiled, e.emoji].join(""));
    };
    const removeEmoji = () => {
      setEmoji(false);
    };

  return (
    <div className={css.answer_wrapper}>
      <div className={css.answer_container}>
        <h4>Questions</h4>
        <p className={css.answer_user}>
          Username: <span>{userDatas.username}</span>
        </p>
        <h6>
          {
            <p>
              <span className="me-3 text-dark">
                <FaCircleArrowRight />
              </span>
              {title[0]?.title}
            </p>
          }
          {<p>{title[0]?.descrbition}</p>}

          {questionLists.title}
        </h6>
        <p>{questionLists.descrbition}</p>
        <hr />
        <div>
          <h3 className="text-center mb-4">Answers from the Community</h3>
          <hr />
        </div>
        <div className={css.all_answer_list}>
          {answers.length > 0 ? (
            answers?.map((answer, index) => {
              return (
                <div className={css.answer_from_comminuty} key={index}>
                  <div className={css.answers_page}>
                    <div className={css.avater_image}>
                      <h1>{userIcon && <FaUserAlt />}</h1>
                      <div>{answer.username}</div>
                    </div>
                    <div>
                      <p>{answer.answer}</p>
                    </div>

                    <div className={css.edit_icons}>
                      {userDatas.id === answer.user_id && (
                        <span>
                          <FaPen />
                        </span>
                      )}

                      <span
                        onClick={() => toggleLike(answer.answer_id)}
                        style={{ color: "blue" }}
                      >
                        {like[answer.answer_id] ? (
                          <BiSolidLike />
                        ) : (
                          <AiOutlineLike />
                        )}
                      </span>
                      {userDatas.id === answer.user_id && (
                        <span>
                          <MdDelete
                            onClick={() => deleteAnswer(answer.answer_id)}
                          />
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <h4 className={css.no_answer}>No Answer yet !!</h4>
          )}
        </div>

        <div className={css.answer_form}>
          <h4 className="text-center mb-5">Answer The Top Questions</h4>
          <form onSubmit={sendAnswers}>
            <textarea
              className="form-control"
              rows="6"
              id="details"
              placeholder="Your Answer"
              name="answer"
              value={answerFiled}
              onChange={(e) => setAnswerFiled(e.target.value)}
              onKeyDown={handleEnterKey}
              onClick={removeEmoji}
            ></textarea>

          <div className={css.emoji}>

              <div className="main-emoji">
                <MdEmojiEmotions onClick={() => setEmoji((prev) => !prev)} />
              </div>
              <div className="emoji-picker">
                {emoji && <EmojiPicker onEmojiClick={hadleEmojies} />}
              </div>
           
          </div>

            <button type="submit">Post Your Answer</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Answer;
