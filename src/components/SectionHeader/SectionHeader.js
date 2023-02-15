import React from "react";
import "./SectionHeader.css";

import {Link} from 'react-router-dom' ;

// import icons
import { AiOutlineArrowLeft } from "react-icons/ai";

export default function SectionHeader(props) {
  return (
    <>
      <div className="container rtl mt-5">
        <div className="d-flex justify-content-between p-3 align-items-center">
          <div className="wallEffect">
            <div className="larger">{props.title}</div>
            <p className="text-muted">{props.content}</p>
          </div>
          {props.btnText ? (
            <div>
              <Link to={props.to}>
                <button className="fill-theme-btn bgTheme">
                  {props.btnText}
                  <AiOutlineArrowLeft className="m-1" />
                </button>
              </Link>
            </div>
          ) : null}
        </div>
      </div>
    </>
  );
}
