import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import toast from "react-hot-toast";
import api from "../../axios";

function useAddQuestions() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [err, setErr] = useState("gray");
  const [loading, setLoading] = useState(false);

  const titleValue = 100;
  const descValue = 255;

  const addQuestions = async (e) => {
    e.preventDefault();
    if (!title || !desc) {
      setErr("red");
      toast.error("Please Fill ALL Fileds");
    }
    if (title?.length > titleValue) {
      setErr("red");
      toast.error("Title should be less than 100 characters");
      return {};
    }
    if (desc?.length > descValue) {
      setErr("red");
      toast.error("Description should be less than 250 characters");
      return {};
    }

    try {
      setLoading(true);
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
      window.scrollTo(0, 0)
    } catch (error) {
      console.log(error);
      // toast.error(error.message)
    } finally {
      setLoading(false);
      setErr("gray");
    }
  };
  return { title, setTitle, desc, setDesc, err, setErr, addQuestions, loading };
}

export default useAddQuestions;
