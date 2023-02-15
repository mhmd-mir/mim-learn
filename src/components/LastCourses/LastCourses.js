import React , {useEffect, useState} from "react";
import SectionHeader from "../SectionHeader/SectionHeader";
import CourseBox from "./../CourseBox/CourseBox";
import "./LastCourses.css";

export default function LastCourses() {

  // state => 
  const [lastCourses , setLastCourses] = useState([]);
  console.log(lastCourses);
  useEffect(() => {
    fetch('http://localhost:4000/v1/courses')
      .then(res => res.json())
      .then(lastCoursesData => setLastCourses(lastCoursesData));
  } , [])
  return (
    <>
      <SectionHeader
        title="جدیدترین دوره ها"
        content="سکو پرتاب شما به سمت موفقیت"
        btnText="تمامی دوره ها" 
        to="/courses/1"
      />
      <div className="container">
        <div className="row">
            {
              lastCourses.splice(0,6).map(course => {
                return (
                  <div className="col-md-4 my-2 gx-5">
                    <CourseBox {...course}/>
                  </div>
                )
              })
            }
        </div>
      </div>
      
    </>
  );
}
