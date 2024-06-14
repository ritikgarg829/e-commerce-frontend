import React from 'react'
import { BiSolidError } from "react-icons/bi";
import "../Styles/error.css"
import { useNavigate } from "react-router-dom"


const error404 = () => {
    const navigate = useNavigate();

    const back = () => {
        navigate(-1);
    }


    return (
        <div>
            <div className="error" ><BiSolidError style={{ height: '200px', width: '200px' }} /></div>
            <h1 className="errors">404 page not found</h1>
            <button className="back" onClick={back}>Back</button>
        </div>
    )
}

export default error404
