import React, { useState, useEffect } from "react";
import Footer from "../../components/Footer/Footer";
import Navbar from "../../components/Navbar/Navbar";
import SectionHeader from "../../components/SectionHeader/SectionHeader";
import Topbar from "../../components/Topbar/Topbar";
import CourseBox from "../../components/CourseBox/CourseBox";
import ArticleBox from "../../components/ArticleBox/ArticleBox";
// styles
import "./Search.css";
import { useParams } from "react-router-dom";

export default function Search() {
  const [searchedCourses, setSearchedCourses] = useState([]);
  const [searchedArticles, setSearchedArticles] = useState([]);

  const params = useParams();
  useEffect(() => {
    fetch(`http://localhost:4000/v1/search/${params.searchedValue}`)
      .then((res) => res.json())
      .then((data) => {
        setSearchedCourses(data.allResultCourses);
        setSearchedArticles(data.allResultArticles);
      });
  }, []);
  return (
    <>
      <Topbar />
      <Navbar />

      <SectionHeader
        title="نتیجه دوره ها برای جستجوی شما"
        content="سکو پرتاب شما به سمت موفقیت"
      />
      <div className="container rtl">
        <div className="row">
          {searchedCourses.length ? (
            searchedCourses.map((course) => {
              return (
                <div className="col-md-4" key={course._id}>
                  <CourseBox {...course} />
                </div>
              );
            })
          ) : (
            <div className="alert alert-warning my-3">
              هیچ دوره ای یافت نشد!
            </div>
          )}
        </div>
      </div>
      <SectionHeader
        title="نتیجه مقالات برای جستجوی شما"
        content="سکو پرتاب شما به سمت موفقیت"
      />
      <div className="container rtl mb-5">
        <div className="row">
          {searchedArticles.length ? (
            searchedArticles.map((article) => {
              return (
                <div className="col-md-4" key={article._id}>
                  <ArticleBox {...article} />
                </div>
              );
            })
          ) : (
            <div className="alert alert-warning my-3">
              هیچ مقاله ای یافت نشد!
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}
