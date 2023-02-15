import React, { useEffect, useState } from "react";
import "./SendTicket.css";

import {Link} from 'react-router-dom'
import swal from 'sweetalert' ;

export default function SendTicket() {
  const [departments, setDepartments] = useState([]);
  const [ticketTypes, setTicketTypes] = useState([]);

  const [userCourses, setUserCourses] = useState([]);

  // stroraging inputs =>
  const [departmentID, setDepartmentID] = useState("");
  const [departmentSubID, setDepartmentSubID] = useState("");
  const [ticketTitle, setTicketTitle] = useState("");
  const [ticketPriority, setTicketPriority] = useState("");
  const [ticketBody, setTicketBody] = useState("");
  const [courseID, setCourseID] = useState("");

  useEffect(() => {
    fetch(`http://localhost:4000/v1/tickets/departments`)
      .then((res) => res.json())
      .then((data) => setDepartments(data));
  }, []);

  // handlers =>
  const departmentChangeHandler = (id) => {
    setDepartmentID(id);
    if (id == -1) return;
    fetch(`http://localhost:4000/v1/tickets/departments-subs/${id}`)
      .then((res) => res.json())
      .then((data) => setTicketTypes(data));
  };
  const titleTypeChangeHandler = (id) => {
    setDepartmentSubID(id);
    if (id === "637753247b52cb74cad00e27") {
      // fetch
      fetch("http://localhost:4000/v1/users/courses", {
        headers: {
          Authorization: `Bearer ${JSON.parse(
            localStorage.getItem("user-token")
          )}`,
        },
      })
        .then((res) => {
          console.log(res);
          return res.json();
        })
        .then((data) => {
          console.log(data);
          console.log("data");
          setUserCourses(data);
        });
    } else {
      setUserCourses([]);
    }
  };

  // send Ticket Handler
  const sendTicketHandler = () => {
    const newTicketInfo = {
      departmentID,
      departmentSubID,
      title: ticketTitle,
      priority: ticketPriority,
      body: ticketBody,
      course: courseID ? courseID : undefined ,
    };

    fetch("http://localhost:4000/v1/tickets", {
      method: "POST",
      headers: {
        "Content-type": "Application/json",
        Authorization: `Bearer ${JSON.parse(
          localStorage.getItem("user-token")
        )}`,
      },
      body: JSON.stringify(newTicketInfo),
    }).then((res) => {
      if(res.ok){
        swal({
          title : 'تیکت با موفقیت ارسال شد'  ,
          icon : 'success' , 
          button : 'تایید'
        })
      }
    });
  };
  return (
    <div className="p-3 rtl">
      <div className="boldTxt">ارسال تیکت جدید</div>
      <div className="my-2 pb-2 border-bottom text-start">
        <Link to="/my-account/tickets">
        <button className="btn btn-secondary">همه تیکت ها</button>
        </Link>
      </div>
      <div className="my-2">
        <div className="row">
          <div className="col-md-6 my-1">
            <div>
              <div className="sendTicketLable">دپارتمان را انتخاب کنید</div>
              <select
                className="form-control"
                onChange={(event) =>
                  departmentChangeHandler(event.target.value)
                }
              >
                <option value="-1">لطفا یک مورد را انتخاب کنید</option>
                {departments.map((dep) => (
                  <option value={dep._id}>{dep.title}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="col-md-6 my-1">
            <div>
              <div className="sendTicketLable">نوع تیکت را انتخاب کنید</div>
              <select
                className="form-control"
                onChange={(event) => titleTypeChangeHandler(event.target.value)}
              >
                <option value="-1">لطفا یک مورد را انتخاب کنید</option>
                {ticketTypes.map((titleType) => (
                  <option value={titleType._id}>{titleType.title}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="col-md-6 my-1">
            <div>
              <div className="sendTicketLable">عنوان تیکت را وارد کنید</div>
              <input
                type="text"
                className="form-control"
                value={ticketTitle}
                onChange={(event) => setTicketTitle(event.target.value)}
              />
            </div>
          </div>
          <div className="col-md-6 my-1">
            <div>
              <div className="sendTicketLable">اولویت تیکت را انتخاب کنید</div>
              <select
                className="form-control"
                onChange={(event) => setTicketPriority(event.target.value)}
              >
                <option value="-1">لطفا یک مورد را انتخاب کنید</option>
                <option value="1">زیاد</option>
                <option value="2">متوسط</option>
                <option value="3">کم</option>
              </select>
            </div>
          </div>
          {userCourses.length == 0 ? null : (
            <div className="col-md-6 my-1">
              <div>
                <div className="sendTicketLable">
                  دوره مورد نظر را انتخاب کنید
                </div>
                <select
                  className="form-control"
                  onChange={(event) => setCourseID(event.target.value)}
                >
                  <option value="-1">لطفا یک مورد را انتخاب کنید</option>
                  {userCourses.map((course) => {
                    return (
                      <option value={course._id}>{course.course.name}</option>
                    );
                  })}
                </select>
              </div>
            </div>
          )}

          <div className="col-12 my-1">
            <div>
              <div className="sendTicketLable">محتوای تیکت را وارد کنید</div>
              <textarea
                className="form-control"
                style={{ height: "250px" }}
                value={ticketBody}
                onChange={(event) => setTicketBody(event.target.value)}
              ></textarea>
            </div>
          </div>
        </div>
        <div className="row my-3">
          <div>
            <button className="btn btn-success" onClick={sendTicketHandler}>
              ارسال تیکت
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
