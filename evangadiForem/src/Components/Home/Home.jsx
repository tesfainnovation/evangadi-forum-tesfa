import React, { useEffect, useState } from 'react'

function Home() {
    const[data,setDatas]=useState([])

    useEffect(()=>{
    fetch("http://localhost:3000/username")
      .then((res) => res.json())
      .then((data) => setDatas(data[0].firstname));
    },[])
  return (
    <div>
      {" "}
      welcome to Home
      <h1>hello{data}</h1>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
    </div>
  );
}

export default Home