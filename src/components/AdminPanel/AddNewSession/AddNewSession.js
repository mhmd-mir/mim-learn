import React, { useState } from "react";
import "./AddNewSession.css";
// validations
import { requiredValidator, minValidator } from "./../../../validations/rules";
// icon
import { MdOutlineCreateNewFolder } from "react-icons/md";
import Input from "../../Input/Input";
// swal
import swal from "sweetalert";
// hooks
import { useForm } from "../../../hooks/useForm";
import { useEffect } from "react";
export default function AddNewSession({ setUpdate }) {
  // some storaging
  const [sessionCourse, setSessionCourse] = useState("");
  const [sessionVideo, setSessionVideo] = useState({});
  const [isFreeSession , setIsFreeSession] = useState(1)
  // useReducer
  const [formState, saveInputDataHandler] = useForm(
    {
      title: {
        value: "",
        isValid: false,
      },
    },
    false
  );
  //
  const [allCourses, setAllCourses] = useState([]);
  // useEffect =>
  useEffect(() => {
    fetch("http://localhost:4000/v1/courses")
      .then((res) => res.json())
      .then((data) => {
        setAllCourses(data);
        setSessionCourse(data[0]._id);
      });
  }, []);

  // add handler =>
  const AddNewSessionHandler = () => {
    const formData = new FormData();
    formData.append("title", formState.inputsDetails.title.value);
    formData.append("time", formState.inputsDetails.time.value);
    formData.append("video", sessionVideo);
    formData.append("free", isFreeSession);

    for (const [key, value] of formData) {
      console.log( `${key}: ${value}\n`);
    }
    
    
    fetch(`http://localhost:4000/v1/courses/${sessionCourse}/sessions`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${JSON.parse(
          localStorage.getItem("user-token")
        )}`,
      },
      body: formData,
    }).then((res) => {
      if (res.ok) {
        swal({
          title: "جلسه با موفقیت به دوره اضافه شد",
          icon: "success",
          button: "تایید",
        }).then(() => {
          setUpdate((prev) => !prev);
        });
      }
    });
  };
  return (
    <>
      <div className="addNewSession">
        <div className="my-3">
          <MdOutlineCreateNewFolder className="addNewSessionIcon" />
        </div>
        <div>
          <div className="row">
            {/* // title input */}
            <div className="col-md-6">
              <div>
                <div className="addNewSessionLable">عنوان جلسه</div>
                <Input
                  validations={[minValidator(5)]}
                  element="input"
                  id="title"
                  saveInputDataHandler={saveInputDataHandler}
                  type="text"
                  placeholder="عنوان جلسه را وارد کنید"
                  className="loginInput form-control"
                />
              </div>
            </div>
            {/* // time input */}
            <div className="col-md-6">
              <div>
                <div className="addNewSessionLable">مدت زمان جلسه</div>
                <Input
                  validations={[minValidator(5)]}
                  element="input"
                  id="time"
                  saveInputDataHandler={saveInputDataHandler}
                  type="text"
                  placeholder="مدت زمان جلسه را وارد کنید"
                  className="loginInput form-control"
                />
              </div>
            </div>
            {/* // course input */}
            <div className="col-md-6">
              <div>
                <div className="addNewSessionLable">مدت زمان جلسه</div>
                <select
                  className="form-control"
                  onChange={(event) => setSessionCourse(event.target.value)}
                >
                  {allCourses.map((course) => (
                    <option key={course._id} value={course._id}>
                      {course.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            {/* // vedio input */}
            <div className="col-md-6">
              <div>
                <div className="addNewSessionLable">ویدیو جلسه</div>
                <input
                  type="file"
                  className="form-control"
                  onChange={(event) => setSessionVideo(event.target.files[0])}
                />
              </div>
            </div>
            {/* // isFree  radio */}
            <div className="col-md-6">
              <div>
                <div className="addNewSessionLable">وضعیت جلسه</div>
                <div className="d-flex">
                  <div className="d-flex align-items-center">
                    <input type="radio" name="isFree" value={1} checked onInput={(event) => setIsFreeSession(event.target.value)} />
                    <span className="mx-2" >رایگان</span>
                  </div>
                  <div className="d-flex align-items-center">
                    <input type="radio" name="isFree" value={0}  onInput={(event) => setIsFreeSession(event.target.value)} />
                    <span className="mx-2">غیر رایگان</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row my-3">
            <div className="text-start">
              <button
                className="btn btn-primary"
                disabled={!formState.isFormValid}
                onClick={AddNewSessionHandler}
              >
                افزودن
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
