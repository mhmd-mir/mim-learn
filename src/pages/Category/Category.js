import React, { useEffect, useState } from "react";
import Footer from "../../components/Footer/Footer";
import Navbar from "../../components/Navbar/Navbar";
import Topbar from "../../components/Topbar/Topbar";
import "./Category.css";

// params
import { useParams } from "react-router-dom";

// importing icons
import { BiSearch } from "react-icons/bi";
import { BsFilterLeft } from "react-icons/bs";
import { TbSquareToggle } from "react-icons/tb";
import CourseBox from "../../components/CourseBox/CourseBox";
import Pagination from "../../components/Pagination/Pagination";

export default function Category() {
  const [ctgCourses, setCtgCourses] = useState([]);
  const [filteredCourses , setFilteredCourses] = useState([]);
  const [paginatedItems, setPaginatedItems] = useState([]);
  let params = useParams();
  useEffect(() => {
    fetch(`http://localhost:4000/v1/courses/category/${params.categoryName}`)
      .then((res) => {
        console.log(res);
        return res.json();
      })
      .then((ctgCourses) => {
        setCtgCourses(ctgCourses);
        setFilteredCourses(ctgCourses);
      });
  }, [params.categoryName]);


  // filter handler => 
  const filtereCourseHandler = (event) => {
    switch(event.target.value){
      case 'default' : {
        setFilteredCourses([...ctgCourses]);
        break ;
      }
      case 'free' : {
        let freeCourses = [...ctgCourses].filter(course => course.price === 0);
        setFilteredCourses(freeCourses);
        break ;
      }
      case 'money' : {
        let notFreeCourses = [...ctgCourses].filter(course => course.price != 0);
        setFilteredCourses(notFreeCourses);
        break ;
      }
      case 'new' : {
        setFilteredCourses([...ctgCourses]);
        break;
      }
      case 'old' : {
        let reverseCourses = [...ctgCourses].reverse();
        setFilteredCourses(reverseCourses);
        break;
      }
    }
  }

  // search course handler =>
  const searchCourseHandler = (event) =>{
    let searchedValue = event.target.value ;
    let ValidCourses = [...ctgCourses].filter(course => {
      return course.name.includes(searchedValue);
    })
    setFilteredCourses(ValidCourses);
  }
  return (
    <>
      <Topbar />
      <Navbar />

      <div className="container my-5">
        <div className="row">
          <div className="d-flex justify-content-between align-items-center rtl">
            <div className="d-flex flex-col flex-md-row">
              <div className="d-flex">
                <button className="d-sm-block d-none fill-theme-btn bg-primary mx-1">
                  <TbSquareToggle />
                </button>
                <button className="d-sm-block d-none fill-theme-btn bg-white border text-dark mx-1">
                  <BsFilterLeft />
                </button>
              </div>
              <select className="spPadding" onChange={filtereCourseHandler}>
                <option value="default">مرتب سازی پیش فرض</option>
                <option value="free">دوره های رایگان</option>
                <option value="money">دوره های نقدی</option>
                <option value="new">جدیدترین دوره ها</option>
                <option value="old">قدیمی ترین دوره ها</option>
              </select>
            </div>
            <div>
              <div className="searchCourse position-relative">
                <input type="text" placeholder="جستجو دوره..." onKeyUp={searchCourseHandler}/>
                <BiSearch />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container my-4 rtl">
        <div className="row">
          {paginatedItems.length ? (
            paginatedItems.map((course) => {
              return (
                <div className="col-md-4 my-3 gx-5" key={course._id}>
                  <CourseBox {...course} />
                </div>
              );
            })
          ) : (
            <div className="alert alert-warning">
              هیچ دوره ای در این دسته بندی یافت نشد
            </div>
          )}
        </div>
      </div>

      <Pagination
        items={filteredCourses}
        itemsNumberInEachPage={3}
        setPaginatedItems={setPaginatedItems}
        mainPath={`/category-info/${params.categoryName}`}
      />
      <Footer />
    </>
  );
}
