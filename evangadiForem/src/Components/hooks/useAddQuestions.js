import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import api from '../../axios';

function useAddQuestions() {

      const navigate = useNavigate();
      const [title, setTitle] = useState("");
      const [desc, setDesc] = useState("");
      const [err, setErr] = useState("gray");

  const addQuestions = async (e) => {
    e.preventDefault();
    if (!title || !desc) {
      setErr("red");
      toast.error("Please Fill ALL Fileds");
    }
    try {
      const token = localStorage.getItem("token");
      const sendQuestion = await api.post(
        "/questions",
        {
          title: title,
          descrbition: desc,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success(sendQuestion.data.msg);
      navigate("/home");
    } catch (error) {
      console.log(error);
    }
  };
  return { title, setTitle, desc, setDesc,err, setErr,addQuestions};
}

export default useAddQuestions