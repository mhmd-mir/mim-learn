import React from "react";
import "./AddNewMenu.css";
import swal from 'sweetalert'
// validations
import { minValidator } from "./../../../validations/rules";
import { useForm } from "../../../hooks/useForm";
// icon
import { RiMenuAddLine } from "react-icons/ri";
import Input from "../../Input/Input";
export default function AddNewMenu({ setUpdate }) {
  // reducer
  const [formState, saveInputDataHandler] = useForm(
    {
      title: {
        value: "",
        isValid: false,
      },
      href: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  // handlers =>
  const addNewMenuHandler = () => {
    const newMenuInfo = {
      title: formState.inputsDetails.title.value,
      href: formState.inputsDetails.href.value,
      parent: undefined,
    };

    fetch("http://localhost:4000/v1/menus", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${JSON.parse(
          localStorage.getItem("user-token")
        )}`,
        'Content-type' : 'application/json'
      },
      body : JSON.stringify(newMenuInfo)
    }).then(res => {
        if(res.ok){
            swal({
                title : 'منو با موفقیت افزوده شد ' , 
                icon : 'success' , 
                buttons : 'تایید'
            }).then(() => {
                setUpdate(prev => !prev)
            })
        }
    })
  };
  return (
    <>
      <div className="addNewMenu">
        <div className="my-3">
          <RiMenuAddLine className="addNewMenuIcon" />
        </div>
        <div>
          <div className="row">
            <div className="col-md-6">
              <div>
                <div className="addNewMenuLable">عنوان منو</div>
                <Input
                  validations={[minValidator(5)]}
                  element="input"
                  id="title"
                  saveInputDataHandler={saveInputDataHandler}
                  type="text"
                  placeholder="عنوان منو را وارد کنید"
                  className="loginInput form-control"
                />
              </div>
            </div>
            <div className="col-md-6">
              <div>
                <div className="addNewMenuLable">لینک منو</div>
                <Input
                  validations={[minValidator(5)]}
                  element="input"
                  id="href"
                  saveInputDataHandler={saveInputDataHandler}
                  type="text"
                  placeholder="لینک منو را وارد کنید"
                  className="loginInput form-control"
                />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="my-3 text-start">
              <button
                className="btn btn-primary"
                disabled={!formState.isFormValid}
                onClick={addNewMenuHandler}
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
