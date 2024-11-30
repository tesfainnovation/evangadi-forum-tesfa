import React from 'react'
import { toast } from 'react-toastify';
import api from '../../axios';
import useAnswers from './useAnswers';
function useDelete() {
const{allQuestions}=useAnswers()
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
  return {deleteAnswer}
}

export default useDelete