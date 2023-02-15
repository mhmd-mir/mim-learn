import React, { useEffect } from "react";
import "./AddNewDiscount.css";
import Input from "../../Input/Input";
// validations
import { requiredValidator, minValidator } from "./../../../validations/rules";
import swal from 'sweetalert' ;
import { useForm } from "../../../hooks/useForm";
// icon
import { TbDiscount2 } from "react-icons/tb";
import { useState } from "react";
export default function AddNewDiscount({setUpdate}) {
  // reducer
  const [formState, saveInputDataHandler] = useForm(
    {
      code: {
        value: "",
        isValid: false,
      },
      percent: {
        value: "",
        isValid: false,
      },
      max: {
        value: "",
        isValid: false,
      },
    },
    false
  );
  // all courses for selectbox
  const [allCourses, setAllCourses] = useState([]);
  const [courseId, setCourseId] = useState("");

  // useEffects =>
  useEffect(() => {
    fetch("http://localhost:4000/v1/courses")
      .then((res) => res.json())
      .then((data) => {
        setAllCourses(data);
        setCourseId(data[0]._id);
      });
  }, []);

  // handler =>
  const addNewCopenHandler = () => {
    const newCopenInfo = {
      code: formState.inputsDetails.code.value,
      percent: formState.inputsDetails.percent.value,
      course: courseId ,
      max: formState.inputsDetails.max.value,
    };


    console.log(newCopenInfo);
    fetch("http://localhost:4000/v1/offs", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${JSON.parse(
          localStorage.getItem("user-token")
        )}`,
      },
      body: JSON.stringify(newCopenInfo),
    }).then(res => {
        if(res.ok){
            swal({
                title : 'کد تخفیف با موفقیت افزوده شد' ,
                icon : 'success' , 
                buttons : 'تایید'
            }).then(() => {
                setUpdate(prev => !prev);
            })
        }
    })
  };
  return (
    <div className="addNewCopen rtl">
      <div className="my-3">
        <TbDiscount2 className="addNewCopenIcon" />
      </div>
      <div>
        <div className="row">
          <div className="col-md-6">
            <div>
              <div className="addNewCopenLable">کد تخفیف</div>
              <Input
                validations={[minValidator(3)]}
                element="input"
                id="code"
                saveInputDataHandler={saveInputDataHandler}
                type="text"
                placeholder="کد تخفیف را وارد کنید..."
                className="loginInput form-control"
              />
            </div>
          </div>
          <div className="col-md-6">
            <div>
              <div className="addNewCopenLable">درصد</div>
              <Input
                validations={[requiredValidator()]}
                element="input"
                id="percent"
                saveInputDataHandler={saveInputDataHandler}
                type="text"
                placeholder="درصد تخفیف را وارد کنید..."
                className="loginInput form-control"
              />
            </div>
          </div>
          <div className="col-md-6">
            <div>
              <div className="addNewCopenLable">حداکثر استفاده</div>
              <Input
                validations={[requiredValidator()]}
                element="input"
                id="max"
                saveInputDataHandler={saveInputDataHandler}
                type="text"
                placeholder="حداکثر استفاده از کد را وارد کنید..."
                className="loginInput form-control"
              />
            </div>
          </div>
          <div className="col-md-6">
            <div>
              <div className="addNewCopenLable">دوره مورد نظر</div>
              <select
                className="form-control"
                onChange={(event) => setCourseId(event.target.value)}
              >
                {allCourses.map((course) => (
                  <option value={course._id}>{course.name}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="text-start my-3">
            <button className="btn btn-primary" onClick={addNewCopenHandler}>
              افزودن
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
