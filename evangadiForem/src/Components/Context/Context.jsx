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
    const [load,setLoad]=useState(false)
  const handleCheck = async () => {
    try {
      const { data } = await api.get("user/check", {
        headers: {
          Authorization: `Bearer ${token}`, 
        },
      });
      setUserDatas(data);
 
      setLoading(false)
    } catch (error) {

      setLoading(false)
      navigate("/");
    }
  };

  useEffect(() => {
    handleCheck();
  
  }, []);






  // question title and disc
  const questionDatas = async () => {

    try {
      setLoad(true)
      const token = localStorage.getItem("token");
      const allQuestions = await api.get("/question/allquestions", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      setQuestionLists(allQuestions.data.data.reverse());
    } catch (error) {
      console.log(error);
    }
    finally{
      setLoad(false)
    }
  };

  const contextValues = {
    userDatas,
    setUserDatas,
    token,
    questionDatas,
    questionLists,
    userIcon,
    loading,
    handleCheck,
    load
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
