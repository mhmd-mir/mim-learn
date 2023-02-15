import React, { useState, useEffect } from "react";
import SectionHeader from "../SectionHeader/SectionHeader";
import "./PresaleCourses.css";
import CourseBox from "../CourseBox/CourseBox";
// slider => (swiper) :
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";

export default function PresaleCourses() {
  const [presaleCourses, setPresaleCourses] = useState([]);

  // useEffect =>
  useEffect(() => {
    fetch("http://localhost:4000/v1/courses/presell")
      .then((res) => res.json())
      .then((data) => {
        setPresaleCourses(data);
      });
  }, []);
  return (
    <>
      <SectionHeader
        title="دوره های درحال پیش فروش"
        content="دوره های تکمیل نشده ولی ارزان قیمت"
      />

      <div className="container rtl ">
        <div className="row">
          <Swiper
            slidesPerView={1}
            spaceBetween={30}
            loop={true}
            className="mySwiper"
            breakpoints={{
              576: {
                // width: 576,
                slidesPerView: 2,
              },
              768: {
                // width: 768,
                slidesPerView: 3,
              },
            }}
          >
            {presaleCourses.map((course) => {
              return (
                <div className="col-md-4 gx-5 my-3">
                  <SwiperSlide key={course._id}>
                    <CourseBox {...course} />
                  </SwiperSlide>
                </div>
              );
            })}
          </Swiper>
        </div>
      </div>
    </>
  );
}
