import React, { useEffect, useState } from "react";
import Footer from "../../components/Footer/Footer";
import Navbar from "../../components/Navbar/Navbar";
import Topbar from "../../components/Topbar/Topbar";
// icons
import { AiFillPlayCircle } from "react-icons/ai";
import { Link } from "react-router-dom";
import { AiOutlineHome } from "react-icons/ai";

// hooks
import { useParams } from "react-router-dom";
export default function SessionsPage() {
  const [sessionInfo, setSessionInfo] = useState([]);
  const [sessions, setSessions] = useState([]);

  const { shortName, sessionID } = useParams();

  useEffect(() => {
    fetch(`http://localhost:4000/v1/courses/${shortName}/${sessionID}`, {
      headers: {
        Authorization: `Bearer ${JSON.parse(
          localStorage.getItem("user-token")
        )}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setSessionInfo(data.session ?? []);
        setSessions(data.sessions ?? []);
      });
  }, []);
  return (
    <>
      <Topbar />
      <Navbar />
      <div className="container-fluid rtl my-5">
        <div className="row">
          <div className="col-lg-4 d-none d-lg-block">
            <div className="h5 text-center py-2">لیست جلسات</div>
            <hr />
            <div className="py-3">
              {sessions.map((session) => (
                <>
                  <div className="d-flex justify-content-between">
                    <div className="d-flex align-items-center">
                      <AiFillPlayCircle />
                      <span className="mx-2">{session.title}</span>
                    </div>
                    <div>{session.time}</div>
                  </div>
                  <hr />
                </>
              ))}
            </div>
          </div>
          <div className="col-lg-8">
            <div className="p-3 bg-dark d-flex justify-content-between align-items-center">
              <div>
                <AiOutlineHome className="mx-2 text-white" />
                <Link className="flatLink text-white" to={`/course-info/${shortName}`}>به خانه بروید</Link>
              </div>
              <div className="text-white">
                <AiFillPlayCircle className="mx-2" />
                {sessionInfo.title}
              </div>
            </div>
            <div className="text-center">
              <video src={`http://localhost:4000/courses/covers/${sessionInfo.video}`} controls className="videoStyles"></video>
              <div>
                <button className="btn btn-secondary my-2">
                  <a href={`http://localhost:4000/courses/covers/${sessionInfo.video}`} className="flatLink text-white">دانلود</a>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
