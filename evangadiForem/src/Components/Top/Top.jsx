import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

function Top() {

        const {location}=useLocation()
        useEffect(()=>{
            window.scrollTo(0,0)
 
    },[location])
}

export default Top