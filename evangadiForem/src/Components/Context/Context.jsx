import React, { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
export const contextApi = createContext();
import api from "../../axios";
function Context({ children }) {
  const navigate = useNavigate();
  const [userDatas, setUserDatas] = useState({});
  const token = localStorage.getItem("token");
  const handleCheck = async () => {
    try {
      const { data } = await api.get("user/check", {
        headers: {
          Authorization: `Bearer ${token}`, 
        },
      });
      setUserDatas(data);
      console.log(data);
    } catch (error) {
      console.log(error);
      navigate("/");
    }
  };

  useEffect(() => {
    handleCheck();
    console.log(userDatas);
  }, []);

  const contextValues={
    userDatas,
    setUserDatas,token
  }
  return (
    <div>
      <contextApi.Provider value={contextValues}>
        {children}
      </contextApi.Provider>
    </div>
  );
}

export default Context;
