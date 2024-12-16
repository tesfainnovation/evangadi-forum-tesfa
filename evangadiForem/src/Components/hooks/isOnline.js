import React, { useState } from 'react'
import api from '../../axios'

 function isOnline() {
    const[online,setOnline]=useState([])

  const checkOnline=async()=>{
    try {
    const {data} = await api.get("/user/online_status");
    setOnline(data.users)
    } catch (error) {
        
        console.log(error)
    }
  }
  return{checkOnline,online}
}


export default isOnline