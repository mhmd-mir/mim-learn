import React, { useState, useEffect } from "react";
import Topbar from "./../../components/Topbar/Topbar";
import Navbar from "./../../components/Navbar/Navbar";
import Footer from "./../../components/Footer/Footer";
import BreadCrumb from "../../components/BreadCrumb/BreadCrumb";
import CourseBox from "../../components/CourseBox/CourseBox";
import Pagination from "../../components/Pagination/Pagination";

export default function Courses() {
  // states =>
  const [allCourses, setAllCourses] = useState([]);
  const [paginatedItems , setPaginatedItems] = useState([])

  useEffect(() => {
    fetch("http://localhost:4000/v1/courses")
      .then((res) => res.json())
      .then((allCourses) => setAllCourses(allCourses));
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
              { id: 2, title: "تمامی دوره ها", to: "/courses" },
            ]}
          />
        </div>
      </div>

      {/* // all courses section */}
      <div className="container rtl my-4">
        <div className="row">
          {paginatedItems.map((course) => {
            return (
              <div className="col-md-4 my-2 gx-5">
                <CourseBox {...course} />
              </div>
            );
          })}
        </div>
      </div>

      {/* // pagination section */}
      <Pagination 
        items={allCourses}
        itemsNumberInEachPage={3}
        setPaginatedItems={setPaginatedItems}
        mainPath="/courses"
      />
      <Footer />
    </>
  );
}
