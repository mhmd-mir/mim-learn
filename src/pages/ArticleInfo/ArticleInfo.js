import React , {useState , useEffect } from "react";
import Topbar from "../../components/Topbar/Topbar";
import Navbar from "./../../components/Navbar/Navbar";
import Footer from "./../../components/Footer/Footer";
import "./ArticleInfo.css";
import BreadCrumb from "../../components/BreadCrumb/BreadCrumb";
import domPurify from 'dompurify'

// importing icons
import { AiOutlineFolder } from "react-icons/ai";
import { FiUser } from "react-icons/fi";
import { AiOutlineClockCircle } from "react-icons/ai";
import { AiOutlineEye } from "react-icons/ai";
import {RiArrowLeftSLine} from 'react-icons/ri'
import CommentArea from "../../components/CommentArea/CommentArea";
import { useParams } from "react-router-dom";
export default function ArticleInfo() {
  // states => 
  const [articleInfo , setArticleInfo] = useState({});
  const [articleCategory, setArticleCategory] = useState({})
  const [articleCreator, setArticleCreator] = useState({})
  // params
  const params = useParams();

  useEffect(() => {
    fetch(`http://localhost:4000/v1/articles/${params.articleName}` , {
      // headers : {
      //   'Authorization' : `Bearer ${JSON.parse(localStorage.getItem('user-token'))}`
      // }
    }).then(res => res.json())
      .then(articleInfoObj => {
        console.log(articleInfoObj);
        setArticleInfo(articleInfoObj);
        setArticleCategory(articleInfoObj.categoryID);
        setArticleCreator(articleInfoObj.creator);
      })
  } , [params.articleName]);
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
              { id: 2, title: "مقاله ها", to: "/category-info/articles" },
              {
                id: 3,
                title: articleInfo.title,
                to: `/article-info/${articleInfo.shortName}`,
              },
            ]}
          />
        </div>
      </div>
      {/* // main article info section */}
      <div className="container rtl my-5">
        <div className="row">
          <div className="col-lg-8">
            <div>
              <div className="h3">
                {articleInfo.title}
              </div>
              <hr />
              <div>
                <ul className="flatUl d-flex">
                  <li className="mx-3">
                    <AiOutlineFolder className="text-gray" />
                    <span className="text-muted me-1">{articleCategory.title}</span>
                  </li>
                  <li className="mx-3">
                    <FiUser className="text-gray" />
                    <span className="text-muted me-1">{articleCreator.name}</span>
                  </li>
                  <li className="mx-3">
                    <AiOutlineClockCircle className="text-gray" />
                    <span className="text-muted me-1">{articleInfo.createdAt?.slice(0,10)}</span>
                  </li>
                </ul>
              </div>
              <div className="my-3">
                <img
                  src={`http://localhost:4000/courses/covers/${articleInfo.cover}`}
                  alt="blogImage"
                  className="img-fluid w-100 rounded"
                />
              </div>
              {/* // html templete from api */}
              <div dangerouslySetInnerHTML={{__html : domPurify.sanitize(articleInfo.body)}}>

              </div>
              {/* <CommentArea /> */}
            </div>
          </div>
          {/* // article-info page => sidebar */}
          <div className="col-lg-4">
            {/* // side bar box */}
            <div className="border p-3 rounded">
              <div className="h5 pe-2">پرامتیاز ترین دوره ها</div>
              <div>
                <ul className="flatUl">
                  <li className="my-3">
                    <div className="d-flex align-items-center">
                      <img
                        src="/images/courses/jango.png"
                        alt="courseImg"
                        className="mx-2 topCourseImg rounded"
                      />
                      <div>پروژه های تخصصی با جاوااسکریپت</div>
                    </div>
                  </li>
                  <li className="my-3">
                    <div className="d-flex align-items-center">
                      <img
                        src="/images/courses/jango.png"
                        alt="courseImg"
                        className="mx-2 topCourseImg rounded"
                      />
                      <div>اموزش تخصصی ری اکت</div>
                    </div>
                  </li>
                  <li className="my-3">
                    <div className="d-flex align-items-center">
                      <img
                        src="/images/courses/jango.png"
                        alt="courseImg"
                        className="mx-2 topCourseImg rounded"
                      />
                      <div>ریداکس در 3 ساعت</div>
                    </div>
                  </li>
                  <li className="my-3">
                    <div className="d-flex align-items-center">
                      <img
                        src="/images/courses/jango.png"
                        alt="courseImg"
                        className="mx-2 topCourseImg rounded"
                      />
                      <div>پروژه های تخصصی با جاوااسکریپت</div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
            {/* // side bar box */}
            <div className="border p-3 rounded my-2">
              <div className="h5 pe-2">دسترسی سریع</div>
              <div>
                <ul className="flatUl pe-3">
                  <li className="my-2">
                    <div className="d-flex align-items-center">
                      <RiArrowLeftSLine />
                      <a href="#" className="flatLink">صفحه اصلی</a>
                    </div>
                  </li>
                  <li className="my-2">
                    <div className="d-flex align-items-center">
                      <RiArrowLeftSLine />
                      <a href="#" className="flatLink">فرانت اند</a>
                    </div>
                  </li>
                  <li className="my-2">
                    <div className="d-flex align-items-center">
                      <RiArrowLeftSLine />
                      <a href="#" className="flatLink">امنیت</a>
                    </div>
                  </li>
                  <li className="my-2">
                    <div className="d-flex align-items-center">
                      <RiArrowLeftSLine />
                      <a href="#" className="flatLink">پایتون</a>
                    </div>
                  </li>
                  <li className="my-2">
                    <div className="d-flex align-items-center">
                      <RiArrowLeftSLine />
                      <a href="#" className="flatLink">مهارت های نرم</a>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
            {/* // side bar box */}
            <div className="border p-3 rounded my-2">
              <div className="h5 pe-2">دسترسی سریع</div>
              <div>
                <ul className="flatUl pe-2">
                  <li className="my-2">
                    <div className="d-flex align-items-center">
                      <a href="#" className="flatLink">نحوه نصب کتابخانه در پایتون | اموزش نصب</a>
                    </div>
                  </li>
                  <li className="my-2">
                    <div className="d-flex align-items-center">
                      <a href="#" className="flatLink">نحوه نصب کتابخانه در پایتون | اموزش نصب</a>
                    </div>
                  </li>
                  <li className="my-2">
                    <div className="d-flex align-items-center">
                      <a href="#" className="flatLink">نحوه نصب کتابخانه در پایتون | اموزش نصب</a>
                    </div>
                  </li>
                  <li className="my-2">
                    <div className="d-flex align-items-center">
                      <a href="#" className="flatLink">نحوه نصب کتابخانه در پایتون | اموزش نصب</a>
                    </div>
                  </li>
                  <li className="my-2">
                    <div className="d-flex align-items-center">
                      <a href="#" className="flatLink">نحوه نصب کتابخانه در پایتون | اموزش نصب</a>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
            {/* // side bar box */}
            <div className="border p-3 rounded my-2">
              <div className="h5 pe-2">دسته بندی مقالات</div>
              <div>
                <ul className="flatUl pe-3">
                  <li className="my-2">
                    <div className="d-flex align-items-center">
                      <RiArrowLeftSLine />
                      <a href="#" className="flatLink">صفحه اصلی</a>
                    </div>
                  </li>
                  <li className="my-2">
                    <div className="d-flex align-items-center">
                      <RiArrowLeftSLine />
                      <a href="#" className="flatLink">فرانت اند</a>
                    </div>
                  </li>
                  <li className="my-2">
                    <div className="d-flex align-items-center">
                      <RiArrowLeftSLine />
                      <a href="#" className="flatLink">امنیت</a>
                    </div>
                  </li>
                  <li className="my-2">
                    <div className="d-flex align-items-center">
                      <RiArrowLeftSLine />
                      <a href="#" className="flatLink">پایتون</a>
                    </div>
                  </li>
                  <li className="my-2">
                    <div className="d-flex align-items-center">
                      <RiArrowLeftSLine />
                      <a href="#" className="flatLink">مهارت های نرم</a>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
            {/* // side bar box */}
            <div className="border p-3 rounded my-2">
              <div className="h5 pe-2">دسته بندی دوره ها</div>
              <div>
                <ul className="flatUl pe-3">
                  <li className="my-2">
                    <div className="d-flex align-items-center">
                      <RiArrowLeftSLine />
                      <a href="#" className="flatLink">صفحه اصلی</a>
                    </div>
                  </li>
                  <li className="my-2">
                    <div className="d-flex align-items-center">
                      <RiArrowLeftSLine />
                      <a href="#" className="flatLink">فرانت اند</a>
                    </div>
                  </li>
                  <li className="my-2">
                    <div className="d-flex align-items-center">
                      <RiArrowLeftSLine />
                      <a href="#" className="flatLink">امنیت</a>
                    </div>
                  </li>
                  <li className="my-2">
                    <div className="d-flex align-items-center">
                      <RiArrowLeftSLine />
                      <a href="#" className="flatLink">پایتون</a>
                    </div>
                  </li>
                  <li className="my-2">
                    <div className="d-flex align-items-center">
                      <RiArrowLeftSLine />
                      <a href="#" className="flatLink">مهارت های نرم</a>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
