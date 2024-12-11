import React, { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
export const contextApi = createContext();
import api from "../../axios";
function Context({ children }) {
  const navigate = useNavigate();
  const [userDatas, setUserDatas] = useState({});
  const token = localStorage.getItem("token");
   const [questionLists, setQuestionLists] = useState([]);
    const [userIcon, setUserIcon] = useState(true);
    const [loading,setLoading]=useState(true)
  const handleCheck = async () => {
    try {
      const { data } = await api.get("user/check", {
        headers: {
          Authorization: `Bearer ${token}`, 
        },
      });
      setUserDatas(data);
      console.log(data);
      setLoading(false)
    } catch (error) {
      console.log(error);
      setLoading(false)
      navigate("/");
    }
  };

  useEffect(() => {
    handleCheck();
    console.log(userDatas)
  }, []);






  // question title and disc
  const questionDatas = async () => {
    try {
      const token = localStorage.getItem("token");
      const allQuestions = await api.get("/question/allquestions", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(allQuestions.data.data);
      setQuestionLists(allQuestions.data.data.reverse());
    } catch (error) {
      console.log(error);
    }
  };

  const contextValues = {
    userDatas,
    setUserDatas,
    token,
    questionDatas,
    questionLists,
    userIcon,
    loading
  };
  return (
    <div>
      <contextApi.Provider value={contextValues}>
        {children}
      </contextApi.Provider>
    </div>
  );
}

export default Context;
