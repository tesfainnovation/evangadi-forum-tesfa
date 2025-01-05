import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../axios";

function useAnswers() {
  const [answers, setAnswers] = useState([]);
  const { question_id } = useParams();
  const [like, setLike] = useState({});
  const[loader,setLoading]=useState(false)

  const allQuestions = async () => {
    try {
      setLoading(true)
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
      setAnswers(allAnswers.reverse());

      const initialLikes = {};
      allAnswers.forEach((answer) => {
        initialLikes[answer.answer_id] = false; // Assuming all answers start with a 'not liked' state
      });
      setLike(initialLikes);
    } catch (error) {
      console.log(error);
    }
    finally{
      setLoading(false)
    }
  };

  useEffect(() => {
    allQuestions();
  }, [question_id]);

  return { answers, like, setLike, allQuestions,loader };
}

export default useAnswers;
