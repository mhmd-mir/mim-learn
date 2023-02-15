import React, { useState, useEffect } from "react";
import SectionHeader from "../SectionHeader/SectionHeader";
import ArticleBox from "./../ArticleBox/ArticleBox";
import "./LastArticles.css";

export default function LastArticles() {
  const [allArticles, setAllArticles] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:4000/v1/articles`, {
      // headers: {
      //   Authorization: `Bearer ${
      //     JSON.parse(localStorage.getItem("user-token")) ?? null
      //   }`,
      // },
    })
      .then((res) => res.json())
      .then((allArticles) => setAllArticles(allArticles));
  }, []);
  return (
    <>
      <SectionHeader
        title="جدیدترین مقاله ها"
        content="پیش بسوی ارتقای دانش"
        btnText="مشاهده تمامی مقالات" 
        to={`/articles/1`}
      />
      <div className="container">
        <div className="row">
          {allArticles.filter(article => article.publish == 1).slice(0,3).map((articleInfo) => {
            return (
              <div className="col-md-4 gx-5 my-3">
                <ArticleBox {...articleInfo}/>
              </div>
            );
          })}
        </div>
      </div>
      <br />
      <br />
    </>
  );
}
