import React, { useState } from 'react'
import { useParams } from 'react-router-dom';
import api from '../../axios';

function useSingleQuestion() {
    const [singleQuestion, setSingleQuestion] = useState([]);
 const{question_id}=useParams()
 
const singleQuestionApi = async () => {
  try {
    const data = await api.get(`/questions/${question_id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    console.log(data.data.singleQuestions);
    setSingleQuestion(data.data.singleQuestions);
  } catch (error) {
    console.log(error);
  }
};

return { singleQuestion, singleQuestionApi };
}

export default useSingleQuestion