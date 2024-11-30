import { useEffect,useState } from 'react'
import { useParams } from 'react-router-dom';
import api from '../../axios';

function useAnswers() {


  const [answers, setAnswers] = useState([]);
  const [title, setTitle] = useState([]);
  const { question_id } = useParams();
  const [like, setLike] = useState({});

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
        (answer) => String(answer.question_id) === question_id
      );
      setAnswers(allAnswers);
      console.log(allAnswers);

      setTitle(allAnswers);  // Assuming title is intended to be a collection of answers
      const initialLikes = {};
      allAnswers.forEach((answer) => {
        initialLikes[answer.answer_id] = false; // Assuming all answers start with a 'not liked' state
      });
      setLike(initialLikes);
    } catch (error) {
      console.log(error);
    }
  };


  useEffect(() => {
    allQuestions()
  }, [question_id]);

  return { answers, like, title, setLike, allQuestions }; }

export default useAnswers;
