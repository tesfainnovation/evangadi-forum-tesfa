import React, { useContext, useEffect, useState } from "react";
import css from "./Answer.module.css";
import user1 from "../../../assets/images/black.jpg";
import { contextApi } from "../../Context/Context";
import { FaCircleArrowRight } from "react-icons/fa6";
import { useParams } from "react-router-dom";
import api from "../../../axios";
import { FaPen } from "react-icons/fa6";
import { AiOutlineLike } from "react-icons/ai";
import { MdDelete } from "react-icons/md";
import { BiSolidLike } from "react-icons/bi";
import { FaUserAlt } from "react-icons/fa";
import useAnswers from "../../hooks/useAnswers";

import EmojiPicker from "emoji-picker-react";
import { MdEmojiEmotions } from "react-icons/md";
import toast from "react-hot-toast";
import useSingleQuestion from "../../hooks/singleQuestion";
import formatTime from "../../formatTime";
const { formatTimes } = formatTime();
import {ClipLoader} from 'react-spinners'

function Answer() {
  const { userDatas, questionLists, userIcon } = useContext(contextApi);
  const [emoji, setEmoji] = useState(false);
  const { answers, like, setLike, allQuestions,loader } = useAnswers();
  const [editAnswers, setEditAnswers] = useState("");
  const [answerFiled, setAnswerFiled] = useState("");
  const { question_id } = useParams();
  const [errColor, setErrorColor] = useState("white");
  const { singleQuestion, singleQuestionApi } = useSingleQuestion();
  const[loading,setLoading]=useState(false)
  const [deletLoading,setDeleteLoading]=useState({})
  


  const sendAnswers = async (e) => {
    e.preventDefault();

    if (!answerFiled) {
      setErrorColor("red");
      toast.error("All fields are required!");
      return;
    }

    try {
      setLoading(true)
      const token = localStorage.getItem("token");
      if (editAnswers) {
        await api.put(
          `/edit/${editAnswers}`,

          { answer: answerFiled },

          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        toast.success("Answer updated successfully!");
        window.scrollTo(0, 0);
      } else {
         setLoading(true)
        await api.post(
          `/answers/${question_id}`,
          { answer: answerFiled },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        toast.success("Answer posted successfully!");
        window.scrollTo(0, 0);
      }

      allQuestions();
      setAnswerFiled("");
      setEditAnswers("");
    } catch (error) {
      console.log(error);
      toast.error("An error occurred while saving the answer!");
    } finally {
      setErrorColor("");
      setLoading(false)
    }
  };

  // edit function
  const editAnswer = (answer) => {
    setEditAnswers(answer.answer_id);
    setAnswerFiled(answer.answer);
  };

  // enable enter key

  const handleEnterKey = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
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
   setDeleteLoading((prev) => ({ ...prev, [answer_id]: true }));
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
    finally{
      setDeleteLoading((prev) => ({ ...prev, [answer_id]: false }));
    }
  };

  // emoji

  const hadleEmojies = (e) => {
    console.log(e);
    setAnswerFiled([answerFiled, e.emoji].join(""));
  };

  //  find title and description
  // const titleDescribtion = questionLists.find((question) => question.question_id === question_id);

  // single questions

  useEffect(() => {
    singleQuestionApi();
  }, [question_id]);

  // get all questions
  useEffect(() => {
    allQuestions();
  }, []);

  return (
    <div className={css.answer_wrapper}>
      <div className={css.answer_container}>
        <div className={css.answer_username}>
          <h4>Questions</h4>
          <p className={css.answer_user}>
            Username: <span>{userDatas.username}</span>
          </p>
        </div>
        <h6>
          {
            <p>
              <span className="me-3 text-dark">
                <FaCircleArrowRight />
              </span>

              {singleQuestion[0]?.title}
            </p>
          }

          <p>{singleQuestion[0]?.descrbition}</p>
        </h6>

        <hr />
        <div>
          <h3 className="text-center mb-4">Answers from the Community</h3>
          <hr />
        </div>
        {
          loader?<h3 className={css.answer_loader}><ClipLoader /></h3>:
        <div className={css.all_answer_list}>
          {answers.length > 0 ? (
            answers?.map((answer, index) => {
              return (
                <div className={css.answer_from_comminuty} key={index}>
                  <div className={css.answers_page}>
                    <div className={css.avater_image}>
                      <h1>{userIcon && <FaUserAlt />}</h1>
                      <div className={css.time_format}>
                        <div className={css.time}>
                          <p>{answer.username}</p>
                          <span>{formatTimes(answer.created_at)}</span>
                        </div>
                      </div>
                    </div>
                    <div>
                      <p>{answer.answer}</p>
                    </div>

                    <div className={css.edit_icons}>
                      {userDatas.id === answer.user_id && (
                        <span>
                          <FaPen onClick={() => editAnswer(answer)} />
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
                        {
                        deletLoading[answer.answer_id]?<ClipLoader size={12}/>:
                          <MdDelete
                            onClick={() => deleteAnswer(answer.answer_id)}
                          />


                        }
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <h4 className={css.no_answer}>
              No answers yet!
              <br />
              Be the first to share your thoughts and help the community.
            </h4>
          )}
        </div>

        }

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
              onClick={() => setEmoji(false)}
              style={{ border: `2px solid ${errColor}` }}
            ></textarea>

            <div className={css.emoji}>
              <div className="main-emoji">
                <MdEmojiEmotions onClick={() => setEmoji((prev) => !prev)} />
              </div>
              <div className="emoji-picker">
                {emoji && <EmojiPicker onEmojiClick={hadleEmojies} />}
              </div>
            </div>

            <button type="submit">
            {loading?'posting answers...':editAnswers ? "Edit Your Answer" : "Post Your Answer"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Answer;

// ALTER TABLE Answers DROP FOREIGN KEY answers_ibfk_2;

// ALTER TABLE Answers
//   CONVERT TO CHARACTER SET utf8mb4
//   COLLATE utf8mb4_unicode_ci;

// ALTER TABLE Answers
//   ADD CONSTRAINT answers_ibfk_2
//   FOREIGN KEY (question_id) REFERENCES Questions(question_id);

// finally
// ALTER TABLE Answers
// MODIFY question_id VARCHAR(200)
// CHARACTER SET utf8mb4
// COLLATE utf8mb4_unicode_ci;
