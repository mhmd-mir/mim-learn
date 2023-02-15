import React from "react";
import "./AddNewCategory.css";

// form validation
import {
  requiredValidator,
  minValidator,
  maxValidator,
} from "./../../validations/rules";

import { useForm } from "../../hooks/useForm";
//swal
import swal from "sweetalert";
// icon
import { BsFolderPlus } from "react-icons/bs";
import Input from "../Input/Input";


export default function AddNewCategory({setUpdate}) {
  // reducer
  const [formState, saveInputDataHandler] = useForm(
    {
      title: {
        value: "",
        isValid: false,
      },
      shortName: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  // handler =>
  const addNewCategoryHandler = () => {
    const newCategoryObj = {
      title: formState.inputsDetails.title.value,
      name: formState.inputsDetails.shortName.value,
    };
    fetch("http://localhost:4000/v1/category", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${JSON.parse(
          localStorage.getItem("user-token")
        )}`,
      },
      body: JSON.stringify(newCategoryObj),
    }).then(res => {
        if(res.ok){
            swal({
                title : 'دسته بندی با موفقیت افزوده شد' ,
                icon : 'success' ,
                buttons : 'تایید'
            }).then(confirm => {
                if(confirm){
                    // update
                    setUpdate(prev => !prev)
                }
            })
        }
    })
  };
  return (
    <>
      <div className="addNewCategory">
        <div className="py-3">
          <BsFolderPlus className="addNewCategoryIcon" />
        </div>
        <div>
          <div className="row">
            <div className="col-md-6">
              <div>
                <div className="addNewCategoryLable">عنوان</div>
                <Input
                  id="title"
                  saveInputDataHandler={saveInputDataHandler}
                  validations={[
                    requiredValidator(),
                    minValidator(5),
                    maxValidator(15),
                  ]}
                  element="input"
                  type="text"
                  placeholder="عنوان"
                  className="loginInput form-control"
                />
              </div>
            </div>
            <div className="col-md-6">
              <div>
                <div className="addNewCategoryLable">نام کوتاه</div>
                <Input
                  id="shortName"
                  saveInputDataHandler={saveInputDataHandler}
                  validations={[minValidator(5), maxValidator(15)]}
                  element="input"
                  type="text"
                  placeholder="نام کوتاه"
                  className="loginInput form-control"
                />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="text-start ps-3 my-3">
              <button
                className="btn btn-primary"
                disabled={!formState.isFormValid}
                onClick={addNewCategoryHandler}
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
