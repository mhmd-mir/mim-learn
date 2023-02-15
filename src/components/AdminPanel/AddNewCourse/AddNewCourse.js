import React from "react";
import "./AddNewCourse.css";
// components
import Input from "./../../../components/Input/Input";
// validation
// rules
import {
  requiredValidator,
  minValidator,
  maxValidator,
} from "./../../../validations/rules";
// useform hook
import { useForm } from "../../../hooks/useForm";
// icons
import { TbNewSection } from "react-icons/tb";
import { useEffect } from "react";
import { useState } from "react";
import swal from "sweetalert";
export default function AddNewCourse({setUpdate}) {
  // states =>
  const [allCategories, setAllCategories] = useState([]);

  // storing some input values for add new course handler
  const [categoryId, setCategoryId] = useState("");
  const [courseImg, setCourseImg] = useState({});
  const [courseStatus, setCourseStatus] = useState("start");
  // form reducer
  const [formState, saveInputDataHandler] = useForm(
    {
      name: {
        value: "",
        isValid: false,
      },
      description: {
        value: "",
        isValid: false,
      },
      shortName: {
        value: "",
        isValid: false,
      },
      price: {
        value: "",
        isValid: false,
      },
      support: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  useEffect(() => {
    fetch("http://localhost:4000/v1/category")
      .then((res) => res.json())
      .then((allCategories) => {
        setAllCategories(allCategories);
        setCategoryId(allCategories[0]._id);
      });
  }, []);

  // handlers
  const addNewCourseHandler = () => {
    const formData = new FormData();
    formData.append("name", formState.inputsDetails.name.value);
    formData.append("description", formState.inputsDetails.description.value);
    formData.append("shortName", formState.inputsDetails.shortName.value);
    formData.append("categoryID", categoryId);
    formData.append("price", formState.inputsDetails.price.value);
    formData.append("support", formState.inputsDetails.support.value);
    formData.append("status", courseStatus);
    formData.append("cover", courseImg);

    fetch("http://localhost:4000/v1/courses", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${JSON.parse(
          localStorage.getItem("user-token")
        )}`,
      },
      body : formData
    }).then(res => {
      if(res.ok){
        swal({
          title : 'دوره مورد نظر با موفقیت افزوده شد'  ,
          icon : 'success' ,
          buttons : 'تایید' ,
        }).then(() => {
          // update dom
          setUpdate(prev => !prev);
        })
      }
    })
  };
  return (
    <>
      <div className="addNewCourse">
        <div className="my-3">
          <TbNewSection className="addNewCourseIcon" />
        </div>
        <div>
          <div className="row">
            {/* // course title input */}
            <div className="col-md-6">
              <div>
                <div className="addNewCourseLable">نام دوره</div>
                <Input
                  validations={[requiredValidator(), minValidator(9)]}
                  element="input"
                  id="name"
                  saveInputDataHandler={saveInputDataHandler}
                  type="text"
                  placeholder="عنوان دوره را وارد کنید"
                  className="loginInput form-control"
                />
              </div>
            </div>
            {/* // course description input */}
            <div className="col-md-6">
              <div>
                <div className="addNewCourseLable">توضیحات دوره</div>
                <Input
                  validations={[requiredValidator(), minValidator(15)]}
                  element="input"
                  id="description"
                  saveInputDataHandler={saveInputDataHandler}
                  type="text"
                  placeholder="توضیحات دوره را وارد کنید"
                  className="loginInput form-control"
                />
              </div>
            </div>
            {/* // course shortName input */}
            <div className="col-md-6">
              <div>
                <div className="addNewCourseLable">لینک دوره</div>
                <Input
                  validations={[requiredValidator(), minValidator(3)]}
                  element="input"
                  id="shortName"
                  saveInputDataHandler={saveInputDataHandler}
                  type="text"
                  placeholder="لینک دوره را وارد کنید"
                  className="loginInput form-control"
                />
              </div>
            </div>
            {/* // course price input */}
            <div className="col-md-6">
              <div>
                <div className="addNewCourseLable">قیمت دوره</div>
                <Input
                  validations={[requiredValidator()]}
                  element="input"
                  id="price"
                  saveInputDataHandler={saveInputDataHandler}
                  type="text"
                  placeholder="قیمت دوره را وارد کنید"
                  className="loginInput form-control"
                />
              </div>
            </div>
            {/* // course support input */}
            <div className="col-md-6">
              <div>
                <div className="addNewCourseLable">نحوه پشتیبانی دوره</div>
                <Input
                  validations={[requiredValidator(), minValidator(4)]}
                  element="input"
                  id="support"
                  saveInputDataHandler={saveInputDataHandler}
                  type="text"
                  placeholder="نحوه پشتیبانی دوره را وارد کنید"
                  className="loginInput form-control"
                />
              </div>
            </div>
            {/* // course category selectbox */}
            <div className="col-md-6">
              <div>
                <div className="addNewCourseLable">دسته بندی دوره</div>
                <select
                  className="form-control"
                  onChange={(event) => setCategoryId(event.target.value)}
                >
                  {allCategories.map((category) => {
                    return (
                      <option value={category._id}>{category.title}</option>
                    );
                  })}
                </select>
              </div>
            </div>
            {/* // course image uploader */}
            <div className="col-md-6">
              <div>
                <div className="addNewCourseLable">تصویر دوره</div>
                <input
                  type="file"
                  className="form-control"
                  onChange={(event) => setCourseImg(event.target.files[0])}
                />
              </div>
            </div>
            {/* // course status radio buttons */}
            <div className="col-md-6">
              <div>
                <div className="addNewCourseLable">وضعیت دوره</div>
                <div className="d-flex">
                  <div className="ms-3 d-flex align-items-center">
                    <input
                      type="radio"
                      name="status"
                      value="start"
                      checked
                      onInput={(event) => setCourseStatus(event.target.value)}
                    />{" "}
                    <span className="mx-2">درحال برگزاری</span>
                  </div>
                  <div className="d-flex align-items-center">
                    <input
                      type="radio"
                      name="status"
                      value="presell"
                      onInput={(event) => setCourseStatus(event.target.value)}
                    />{" "}
                    <span className="mx-2"> پیش فروش</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="text-start">
              <button
                className="btn btn-primary"
                disabled={!formState.isFormValid}
                onClick={addNewCourseHandler}
              >
                افزودن{" "}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
