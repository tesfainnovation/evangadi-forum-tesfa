import React, { useContext, useEffect, useState } from "react";
import { contextApi } from "../Context/Context";


function Home() {
  const [data, setDatas] = useState([]);
  const {userDatas}=useContext(contextApi)


  console.log(userDatas)


  return (
    <div>
   {/* {
    !userDatas &&<div>
      <h1>loading....</h1>
    </div>
   } */}

     <div className={style.module}></div>
    </div>
  );
}

export default Home;
