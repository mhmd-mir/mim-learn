import React, { useState, useEffect } from "react";
import Footer from "../../components/Footer/Footer";
import Navbar from "../../components/Navbar/Navbar";
import Topbar from "../../components/Topbar/Topbar";
import CourseInfoBox from "./../../components/CourseInfoBox/CourseInfoBox";
import BreadCrumb from "./../../components/BreadCrumb/BreadCrumb";
import Accordion from "react-bootstrap/Accordion";
import "./CourseInfo.css";
import { Link } from "react-router-dom";
// importing icons
import { BsTelegram } from "react-icons/bs";
import { AiFillTwitterCircle } from "react-icons/ai";
import { GrFacebookOption } from "react-icons/gr";
import { MdSchool } from "react-icons/md";
import { BsFillClockFill } from "react-icons/bs";
import { BsFillCalendarDateFill } from "react-icons/bs";
import { BsFillPersonFill } from "react-icons/bs";
import { AiTwotoneEdit } from "react-icons/ai";
import { FaPlay } from "react-icons/fa";
import { GiProgression } from "react-icons/gi";
import { FaUserAlt } from "react-icons/fa";
import { BiMessageRounded } from "react-icons/bi";
import { GrView } from "react-icons/gr";
import { AiOutlineLink } from "react-icons/ai";
import { FaChalkboardTeacher } from "react-icons/fa";
import CommentArea from "../../components/CommentArea/CommentArea";
import { AiFillYoutube } from "react-icons/ai";
import { FaLock } from "react-icons/fa";

// importing hooks
import { useParams } from "react-router-dom";
import swal from "sweetalert";
export default function CourseInfo() {
  const params = useParams();
  // states =>
  const [update, setUpdate] = useState(false);
  const [courseInfo, setCourseInfo] = useState({});
  const [courseComments, setCourseComments] = useState([]);
  const [courseSessions, setCourseSessions] = useState([]);
  const [relatedCourses, setRelatedCourses] = useState([]);
  // useEffect =>
  useEffect(() => {
    fetch(`http://localhost:4000/v1/courses/${params.courseName}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem("user-token")) ?? null
        }`,
      },
    })
      .then((res) => res.json())
      .then((courseInfo) => {
        console.log(courseInfo);
        setCourseInfo(courseInfo);
        setCourseComments(courseInfo.comments);
        setCourseSessions(courseInfo.sessions);
      });
  }, [params.courseName, update]);
  useEffect(() => {
    fetch(`http://localhost:4000/v1/courses/related/${params.courseName}`)
      .then((res) => res.json())
      .then((data) => {
        setRelatedCourses(data);
      });
  }, []);
  // handlers =>
  const registerCourseHandler = () => {
    if (courseInfo.price == 0) {
      // register free course
      swal({
        title: "?????? ?????? ???? ????????",
        text: "?????? ???? ?????? ?????? ???? ???????? ?????????? ????????????",
        icon: "info",
        buttons: ["??????", "??????"],
      }).then((confirm) => {
        if (confirm) {
          fetch(`http://localhost:4000/v1/courses/${courseInfo._id}/register`, {
            method: "POST",
            headers: {
              "Content-type": "Application/json",
              Authorization: `Bearer ${JSON.parse(
                localStorage.getItem("user-token")
              )}`,
            },
            body: JSON.stringify({ price: 0 }),
          }).then((res) => {
            if (res.ok) {
              swal({
                title: "?????? ?????? ???? ???????????? ?????????? ????",
                icon: "success",
                buttons: "??????????",
              }).then(() => {
                // update dom :
                setUpdate((prev) => !prev);
              });
            }
          });
        }
      });
    } else {
      // register not free courses
      swal({
        title: "?????? ?????? ???? ????????",
        text: "?????? ???? ?????? ?????? ???? ???????? ?????????? ????????????",
        icon: "info",
        buttons: ["??????", "??????"],
      }).then((confirm) => {
        if (confirm) {
          // recieve discount code :
          swal({
            title: "???? ??????????",
            text: "???? ?????????? ???????????? ?????????? ???????? ????????",
            content: "input",
            icon: "info",
            buttons: ["?????? ?????? ???????? ???? ??????????", "?????????? ???? ?? ????????????"],
          }).then((code) => {
            console.log(code);
            if (code == null) {
              fetch(
                `http://localhost:4000/v1/courses/${courseInfo._id}/register`,
                {
                  method: "POST",
                  headers: {
                    "Content-type": "Application/json",
                    Authorization: `Bearer ${JSON.parse(
                      localStorage.getItem("user-token")
                    )}`,
                  },
                  body: JSON.stringify({ price: 0 }),
                }
              ).then((res) => {
                if (res.ok) {
                  swal({
                    title: "?????? ?????? ???? ???????????? ?????????? ????",
                    icon: "success",
                    buttons: "??????????",
                  }).then(() => {
                    // update dom :
                    setUpdate((prev) => !prev);
                  });
                }
              });
            } else {
              // test discount code
              fetch(`http://localhost:4000/v1/offs/${code}`, {
                method: "POST",
                headers: {
                  "content-type": "application/json",
                  Authorization: `Bearer ${JSON.parse(
                    localStorage.getItem("user-token")
                  )}`,
                },
                body: JSON.stringify({
                  course: courseInfo._id,
                }),
              })
                .then((res) => {
                  switch (res.status) {
                    case 404: {
                      swal({
                        title: "???? ?????????? ?????????? ????????",
                        icon: "error",
                        buttons: "??????????",
                      });
                      break;
                    }
                    case 409: {
                      swal({
                        title: "???? ?????????? ?????????? ??????",
                        icon: "info",
                        buttons: "??????????",
                      });
                      break;
                    }
                    case 200: {
                      // correct code
                      // continue course register process ...
                      return res.json();
                      break;
                    }
                  }
                })
                .then((code) => {
                  fetch(
                    `http://localhost:4000/v1/courses/${courseInfo._id}/register`,
                    {
                      method: "POST",
                      headers: {
                        "Content-type": "Application/json",
                        Authorization: `Bearer ${JSON.parse(
                          localStorage.getItem("user-token")
                        )}`,
                      },
                      body: JSON.stringify({
                        price:
                          courseInfo.price -
                          courseInfo.price * (code.percent / 100),
                      }),
                    }
                  ).then((res) => {
                    if (res.ok) {
                      swal({
                        title: "?????? ?????? ???? ???????????? ?????????? ????",
                        icon: "success",
                        buttons: "??????????",
                      }).then(() => {
                        // update dom :
                        setUpdate((prev) => !prev);
                      });
                    }
                  });
                });
            }
          });
        }
      });
    }
  };
  return (
    <>
      <Topbar />
      <Navbar />
      {/* // breadcrumb section */}
      <div className="container my-3">
        <div className="row">
          <div className="text-cent">
            <BreadCrumb
              links={[
                { id: 1, title: "????????", to: "/" },
                {
                  id: 2,
                  title: courseInfo.categoryID?.title,
                  to: "/category-info/frontend",
                },
                {
                  id: 3,
                  title: courseInfo?.name,
                  to: "/course-info/javascript",
                },
              ]}
            />
          </div>
        </div>
      </div>
      <hr />
      {/* // main course Info */}
      <div className="container rtl my-4">
        <div className="row">
          <div className="col-md-6">
            <div className="categoryTitle">
              <span className="bgLightTheme">
                {courseInfo.categoryID?.title}
              </span>
            </div>
            <div className="courseTitle my-3">
              <div className="h4">{courseInfo?.name}</div>
            </div>
            <div className="courseContent">
              <p className="text-muted">{courseInfo.description}</p>
            </div>
            <div className="courseIcons">
              <BsTelegram />
              <AiFillTwitterCircle />
              <GrFacebookOption />
            </div>
          </div>
          <div className="col-md-6">
            <div className="p-3">
              <video
                src="#"
                controls
                poster="/images/courses/jango.png"
                className="img-fluid w-100 rounded"
              ></video>
            </div>
          </div>
        </div>
      </div>
      {/* // more details section */}
      <div className="container rtl">
        <div className="row">
          <div className="col-lg-8">
            {/* // course info boxes */}
            <div className="courseInfoBoxes">
              <div className="row">
                <div className="col-sm-4">
                  <CourseInfoBox
                    title="?????????? ????????"
                    content={
                      courseInfo.isComplete
                        ? "???? ?????????? ??????????"
                        : "???? ?????? ??????????????"
                    }
                    icon={<MdSchool />}
                  />
                </div>
                <div className="col-sm-4">
                  <CourseInfoBox
                    title="?????? ???????? ????????"
                    content="19 ????????"
                    icon={<BsFillClockFill />}
                  />
                </div>
                <div className="col-sm-4">
                  <CourseInfoBox
                    title="?????????? ??????????????????"
                    content={courseInfo.updatedAt?.slice(0, 10)}
                    icon={<BsFillCalendarDateFill />}
                  />
                </div>
                <div className="col-sm-4">
                  <CourseInfoBox
                    title="?????? ????????????????"
                    content={courseInfo.support}
                    icon={<BsFillPersonFill />}
                  />
                </div>
                <div className="col-sm-4">
                  <CourseInfoBox
                    title="?????? ????????"
                    content="html , css"
                    icon={<AiTwotoneEdit />}
                  />
                </div>
                <div className="col-sm-4">
                  <CourseInfoBox
                    title="?????? ????????????"
                    content="?????? ?????? / ????????????"
                    icon={<FaPlay />}
                  />
                </div>
              </div>
            </div>
            {/* // course progressbar section */}
            <div className="progressBar mt-4 mb-2 p-3 rounded bgLightTheme">
              <div className="d-flex align-items-center pe-3">
                <div>
                  <GiProgression />
                </div>
                <div>???????? ???????????? ???????? : 100%</div>
              </div>
              <div className="mt-3">
                <div className="progressParent">
                  <div className="progressValue"></div>
                </div>
              </div>
            </div>
            {/* // this section is details of course 
             // its templete come from server (html templete) */}

            {/* // accordion */}
            <div>
              <Accordion defaultActiveKey="0">
                <Accordion.Item eventKey="0" className="my-3 bg-light">
                  <Accordion.Header>?????????? ????????</Accordion.Header>
                  <Accordion.Body>
                    {courseSessions.map((session, index) => {
                      return (
                        <>
                          {session.free == 1 ||
                          courseInfo.isUserRegisteredToThisCourse ? (
                            <>
                              <div className="d-flex justify-content-between align-items-center">
                                <div className="d-flex align-items-center">
                                  <div className="accordionItemIndex text-muted">
                                    {index + 1}
                                  </div>
                                  <div className="playIcon">
                                    <AiFillYoutube className="mx-2 text-gray" />
                                  </div>
                                  <div className="accordionItemTitle boldTxt">
                                    <Link
                                      className="flatLink"
                                      to={`/courses/${courseInfo.shortName}/${session._id}`}
                                    >
                                      {session.title}
                                    </Link>
                                  </div>
                                </div>
                                <div>{session.time}</div>
                              </div>
                              <hr />
                            </>
                          ) : (
                            <>
                              <div className="d-flex justify-content-between align-items-center">
                                <div className="d-flex align-items-center">
                                  <div className="accordionItemIndex text-muted">
                                    {index + 1}
                                  </div>
                                  <div className="playIcon">
                                    <AiFillYoutube className="mx-2 text-gray" />
                                  </div>
                                  <div className="accordionItemTitle boldTxt">
                                    {session.title}
                                  </div>
                                </div>
                                <div>
                                  <FaLock className="mx-2" />
                                  {session.time}
                                </div>
                              </div>
                              <hr />
                            </>
                          )}
                        </>
                      );
                    })}
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
            </div>
            {/* // teacher info section */}
            <div className="my-4">
              <div className="d-flex justify-content-between align-items-center">
                <div className="d-flex align-items-center">
                  <img
                    src="/images/info/teacher.jfif"
                    alt="teacher"
                    className="rounded-circle mx-2 teacherProfile"
                  />
                  <div>
                    <div className="h5 mb-0">???????? ???????? ?????????? ??????</div>
                    <div>frontEnd & backend developer</div>
                  </div>
                </div>
                <div>
                  <button className="fill-theme-btn bgTheme">
                    <FaChalkboardTeacher className="ms-1" />
                    ????????
                  </button>
                </div>
              </div>
              <div className="mt-2">
                <p className="text-muted p-2">
                  ?????? ???? ?????? ???????????? ?????????? ?????????????? ???? ???????? ???????? . ?????????? ???? ???? ??????
                  ???? ???????? ???????? ?????????????? ?????? ???????????? ?????? ?????????? ???????????? ???? ?????????? ????
                  ???????????? ?????????? ????????...
                </p>
              </div>
            </div>
            {/* // comment box section */}
            <CommentArea comments={courseComments} />
          </div>
          <div className="col-lg-4">
            {/* // isLogin section */}
            <div className="border p-3 rounded">
              <div className="text-center">
                {courseInfo.isUserRegisteredToThisCourse ? (
                  <button className="py-2 shadow w-100 fill-theme-btn bg-success">
                    <MdSchool className="mx-1" />
                    ?????????????? ???????? ??????????
                  </button>
                ) : (
                  <button
                    onClick={registerCourseHandler}
                    className="py-2 shadow w-100 fill-theme-btn bg-danger"
                  >
                    <MdSchool className="mx-1" />
                    ?????? ?????? ???? ????????
                  </button>
                )}
              </div>
            </div>
            {/* // more info section */}
            <div className="rounded border p-3 mt-2">
              <div className="border rounded my-3 text-center">
                <p className="m-0 py-2">
                  <FaUserAlt className="mx-2" />
                  ?????????? ???????????? :
                  <span className="badge bg-secondary mx-1">
                    {courseInfo.courseStudentsCount}
                  </span>
                </p>
              </div>
              <div className="d-flex justify-content-center">
                <div className="border-start ps-2">
                  <BiMessageRounded className="mx-2" />
                  67 ????????????
                </div>
                <div>
                  <GrView className="mx-2" />
                  14,234 ????????????
                </div>
              </div>
            </div>
            {/* // short link section */}
            <div className="border rounded p-3 mt-2">
              <div className="h5">
                <AiOutlineLink className="mx-2 largerIcon" />
                ???????? ??????????
              </div>
              <div className="text-center my-2 border rounded p-1">
                <a className="flatLink" href="#">
                  http://mimlearn/course:react142
                </a>
              </div>
            </div>
            {/* // Headlines box */}
            <div className="border rounded p-3 mt-2">
              <div className="h5">?????????? ?????? ????????</div>
              <p className="m-0">
                ???????? ???????????? ?? ???? ???????????? ???????? ?????? ????????{" "}
                <a className="flatLink text-primary" href="#">
                  ????????
                </a>{" "}
                ???????? ????????
              </p>
            </div>
            {/* // close courses */}
            <div className="border rounded p-3 mt-2 mb-2">
              <div>???????? ?????? ??????????</div>
              <div className="closeCourseList">
                <ul>
                  {relatedCourses.map((course) => (
                    <li className="my-3">
                      <div className="d-flex align-items-center">
                        <img
                          src={`http://localhost:4000/courses/covers/${course.cover}`}
                          alt="course"
                          className="closeCourseImg mx-2"
                        />
                        <Link to={`/course-info/${course.shortName}`} className="flatLink">
                          {course.name}
                        </Link>
                      </div>
                    </li>
                  ))}
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
