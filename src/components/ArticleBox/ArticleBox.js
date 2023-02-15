import React from "react";
import "./ArticleBox.css";

import { Link } from "react-router-dom";

export default function ArticleBox({ cover, title, description, shortName }) {
  return (
    <>
      <div className="articleBox rtl shadow rounded p-3">
        <div>
          <img
            src={`http://localhost:4000/courses/covers/${cover}`}
            alt=""
            className="img-fluid w-100 rounded"
            style={{'height' : '360px'}}
          />
        </div>
        <div>
          <Link to={`/article-info/${shortName}`} className="flatLink">
            <div className="h5">{title}</div>
          </Link>
          <p className="text-muted articleDesc">{description}</p>
        </div>
        <div>
          <Link to={`/article-info/${shortName}`} className="flatLink">
            <button className="outline-theme-btn">بیشتر بخوانید</button>
          </Link>
        </div>
      </div>
    </>
  );
}
