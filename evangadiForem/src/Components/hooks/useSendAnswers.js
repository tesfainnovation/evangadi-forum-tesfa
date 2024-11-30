import React, { useState} from 'react'
import useAnswers from './useAnswers';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import api from '../../axios';

function useSendAnswers() {
  const [answerFiled, setAnswerFiled] = useState("");
  const{allQuestions}=useAnswers()
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
 return { sendAnswers, answerFiled, setAnswerFiled };
}

export default useSendAnswers