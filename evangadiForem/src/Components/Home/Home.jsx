import React, { useContext, useEffect, useState } from "react";
import { contextApi } from "../Context/Context";
import style from "./Home.module.css";
import { IoIosArrowForward } from "react-icons/io";
import user2 from "../../assets/images/user.jpg";
import user1 from '../../assets/images/black.jpg'
import { Link } from "react-router-dom";
import api from "../../axios";

function Home() {
  const [datas, setDatas] = useState([]);
  const { userDatas } = useContext(contextApi);
  const[user,setUser]=useState(true)


  // console.log(userDatas);

const questionDatas=async()=>{
     try {
      const token=localStorage.getItem('token')
      const allQuestions = await api.get("/question/allquestions",{
        headers:{
  Authorization:`Bearer ${token}`
        },

      });
      console.log(allQuestions.data.data)
      setDatas(allQuestions.data.data.reverse())
      
     } catch (error) {
      console.log(error)
     }
}
useEffect(()=>{
questionDatas()
console.log('hello')
},[])




  return (
    <div className={style.home}>
    
      <div className={style.home_conatiner}>
        <div className={style.addquestions_btn}>
          <Link to="/questions">
            <button>Add Questions</button>
          </Link>

          <p>Username:{userDatas.username}</p>
        </div>
        <h4>Quesions</h4>
        <hr />
        <Link to='/answers'>
          <div>

           {datas.map((data,index)=>{
            return(

            <div
              className={style.questions}
              onMouseOver={() => setUser((prev) => !prev)}
               key={index}>
              <div className={style.avater}>
                <div className={style.avater_img}>
                  <img src={user1} alt="" width={"70px"} />
                </div>
                <div>{data.firstname}</div>
              </div>
              <div>{data.title}</div>
              <div className={style.arrow}>
                <IoIosArrowForward />
              </div>
            </div>
            )
           })} 
          </div>
        </Link>
        <hr />
      </div>
    </div>
  );
}

export default Home;
