import React, { useState, useEffect } from "react";
import "./LandingCounter.css";

export default function LandingCounter(props) {
  const [count, setCount] = useState(0);
  useEffect(() => {

    let interval = setInterval(() => {
        if(count === props.count){
            clearInterval(interval);
            return ;
        }
        setCount((prev) => prev + 1);
        
    } , 10)

    return () => {
        clearInterval(interval);
    }
  }, [count])
  return (
    <>
      <div className="mx-lg-5 mx-3 mt-3 landingDetails">
        {props.children}
        <div className="larger">{count}</div>
        <p>{props.txt}</p>
      </div>
    </>
  );
}
