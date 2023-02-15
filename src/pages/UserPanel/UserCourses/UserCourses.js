import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import "./UserCourses.css";

export default function UserCourses() {
  const [filterState, setFilterState] = useState("all");
  const [userCourses, setUserCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/v1/users/courses", {
      headers: {
        Authorization: `Bearer ${JSON.parse(
          localStorage.getItem("user-token")
        )}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setUserCourses(data);
        setFilteredCourses(data);
      });
  }, []);

  useEffect(() => {
    switch (filterState) {
      case "free": {
        let filteredCourses = [...userCourses].filter(
          (course) => course.course.price === 0
        );
        setFilteredCourses(filteredCourses);
        break;
      }
      case "money": {
        let filteredCourses = [...userCourses].filter(
          (course) => course.course.price !== 0
        );
        setFilteredCourses(filteredCourses);
        break;
      }
      default: {
        setFilteredCourses([...userCourses]);
        break;
      }
    }
  }, [filterState]);

  return (
    <>
      <div className="p-3 rtl">
        <div>
          <p className="h4">دوره های ثبت نام شده</p>
        </div>
        <div className="my-3 d-flex border-bottom pb-2">
          <div
            className={`pointerCursor boldTxt mx-3 ${
              filterState == "all" ? "activeCourseTab" : null
            }`}
            onClick={() => setFilterState("all")}
          >
            همه دوره ها
          </div>
          <div
            className={`pointerCursor boldTxt mx-3 ${
              filterState == "free" ? "activeCourseTab" : null
            }`}
            onClick={() => setFilterState("free")}
          >
            دوره های رایگان
          </div>
          <div
            className={`pointerCursor boldTxt mx-3 ${
              filterState == "money" ? "activeCourseTab" : null
            }`}
            onClick={() => setFilterState("money")}
          >
            دوره های پولی
          </div>
        </div>

        <div className="my-3">
          {filteredCourses.length == 0 ? (
            <div className="alert alert-danger">دوره ای یافت نشد!</div>
          ) : (
            filteredCourses.map((course) => (
              <div className="d-flex rounded courseBoxUi mb-2">
                <div className="ms-2">
                  <img
                    src="/images/courses/fareelancer.png"
                    className="img-fluid "
                    width={250}
                  />
                </div>
                <div className="mt-2">
                  <div className="h5">{course.course.name}</div>
                  <div className="d-flex">
                    <div className="mx-2">
                      <span className="boldTxt">وضعیت</span> :{" "}
                      {course.course.isComplete === 0
                        ? "درحال برگزاری"
                        : "تکمیل شده"}
                    </div>
                    <div className="mx-2">
                      <span className="boldTxt">مبلغ</span> :{" "}
                      {course.course.price === 0
                        ? "رایگان"
                        : course.course.price}
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
}
