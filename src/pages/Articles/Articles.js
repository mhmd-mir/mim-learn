import React, { useState, useEffect } from "react";
import Footer from "../../components/Footer/Footer";
import Navbar from "../../components/Navbar/Navbar";
import Topbar from "../../components/Topbar/Topbar";
import BreadCrumb from "../../components/BreadCrumb/BreadCrumb";
import ArticleBox from "../../components/ArticleBox/ArticleBox";
import Pagination from "../../components/Pagination/Pagination";
import "./Articles.css";

export default function Articles() {
  const [allArticles, setAllArticles] = useState([]);
  const [paginatedItems , setPaginatedItems] = useState([])
  // useEffect =>
  useEffect(() => {
    fetch(`http://localhost:4000/v1/articles`, {
      // headers: {
      //   // 'Authorization' : `Bearer ${
      //   //   JSON.parse(localStorage.getItem("user-token")) ?? null
      //   // }`,
      // },
    })
      .then((res) => res.json())
      .then((allArticlesArr) => {
        console.log(allArticlesArr)
        setAllArticles(allArticlesArr);
      });
  }, []);
  return (
    <>
      <Topbar />
      <Navbar />
      {/* // breadcrumb section */}
      <div className="container my-3">
        <div className="row">
          <BreadCrumb
            links={[
              { id: 1, title: "خانه", to: "/" },
              { id: 2, title: "تمامی مقالات ها", to: "/articles/1" },
            ]}
          />
        </div>
      </div>
      {/* // all articles ... */}
      <div className="container">
        <div className="row">
          {paginatedItems.map((article) => {
            return (
              <div className="col-md-4 gx-5 my-3">
                <ArticleBox {...article} />
              </div>
            );
          })}
        </div>
      </div>
      {/* // pagination */}
      <Pagination 
        items={allArticles.filter(article => article.publish == 1)}
        itemsNumberInEachPage={3}
        setPaginatedItems={setPaginatedItems}
        mainPath="/articles"
      />
      <Footer />
    </>
  );
}
