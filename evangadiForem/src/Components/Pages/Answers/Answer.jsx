import React, { useContext, useEffect, useState } from "react";
import css from "./Answer.module.css";
import user1 from "../../../assets/images/black.jpg";
import { contextApi } from "../../Context/Context";
import { FaCircleArrowRight } from "react-icons/fa6";
import { useParams } from "react-router-dom";
import api from "../../../axios";
import { toast } from "react-toastify";

function Answer() {
  const { userDatas, questionLists } = useContext(contextApi);
  const [answers, setAnswers] = useState([]);
  const { question_id } = useParams();
  const[answerFiled,setAnswerFiled]=useState('')

  console.log(question_id)

  const allQuestions = async () => {
    try {
      const token = localStorage.getItem("token");
      const allAnswerList = await api.get("/answers/allanswers", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(allAnswerList.data.allAnswers);
      const answerData = allAnswerList.data.allAnswers;
      const allAnswers = answerData.filter(
        (answer) => String(answer.question_id) === (question_id)
      );

      // const allAnswers = answerData.filter(
      //   (answer) => String(answer.question_id) === String(question_id)
      // );

      setAnswers(allAnswers);
      console.log(allAnswers);
    } catch (error) {
      console.log(error);
      console.log("answers");
    }
  };

  useEffect(() => {
    allQuestions();
  }, [question_id]);

const sendAnswers=async(e)=>{
  e.preventDefault()

  if(!answerFiled){
toast.error('all filed required!')
  }
try {
  const token = localStorage.getItem("token");
  const answers= await api.post(
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
console.log(answers)
allQuestions()

} catch (error) {
  console.log(error)
}
}


  return (
    <div className={css.answer_wrapper}>
      <div className={css.answer_container}>
        <h4>Questions</h4>
        <h1 style={{ float: "right" }}>{userDatas.username}</h1>
        <h6>
          <span className="me-3 text-dark">
            <FaCircleArrowRight />
          </span>
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
                    <img src={user1} alt={answer.username} width={"70px"} />
                    <div>{answer.username}</div>
                  </div>
                  <div>
                    <p>{answer.answer}</p>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <h1>No Answer yet</h1>
        )}
        </div>

        <hr />

        <div className={css.answer_form}>
          <h4 className="text-center mb-5">Answer The ToP Questions</h4>
          <form onSubmit={sendAnswers}>
            <textarea
              className="form-control"
              rows="6"
              id="details"
              placeholder="Your Answer"
              name="answer"
              value={answerFiled}
              onChange={((e)=>setAnswerFiled(e.target.value))}
            ></textarea>

            <button type="submit">Post Your Answer</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Answer;
