import React from "react";
import "./AddNewUser.css";
// importing rules validations
import {
  requiredValidator,
  minValidator,
  maxValidator,
  phoneValidator,
  emailValidator,
} from "./../../../validations/rules";

// swal
import swal from "sweetalert";
// importing components
import Input from "./../../../components/Input/Input";
// importing icons
import { AiOutlineUserAdd } from "react-icons/ai";
import { useForm } from "../../../hooks/useForm";
export default function AddNewUser({ setUpdate }) {
  // form useReducer
  const [formState, saveInputDataHandler] = useForm(
    {
      name: {
        value: "",
        isValid: false,
      },
      username: {
        value: "",
        isValid: false,
      },
      email: {
        value: "",
        isValid: false,
      },
      password: {
        value: "",
        isValid: false,
      },
      phone: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  // handlers =>
  const addNewUserHandler = () => {
    const newUserObj = {
      name: formState.inputsDetails.name.value,
      username: formState.inputsDetails.username.value,
      email: formState.inputsDetails.email.value,
      phone: formState.inputsDetails.phone.value,
      password: formState.inputsDetails.password.value,
      confirmPassword: formState.inputsDetails.password.value,
    }
    fetch('http://localhost:4000/v1/auth/register' , {
        method : 'POST' , 
        headers : {
            'Content-type' : 'Application/json'
        } ,
        body : JSON.stringify(newUserObj)
    }).then(res => {
        if(res.ok){
            swal({
                title : 'کاربر با موفقیت افزوده شد' , 
                icon : 'success' , 
                buttons : 'تایید'
            }).then(confirm => {
                // update dom
                console.log('user added');
                setUpdate(true);
            })
        }
    })
  };
  return (
    <>
      <div className="addNewUserSection rtl">
        <div className="py-3">
          <AiOutlineUserAdd className="addNewUserIcon" />
        </div>
        <div className="addNewUserInputs">
          <div className="row">
            <div className="col-md-6">
              <div>
                <div className="addNewUserLable">نام و نام خانوادگی</div>
                <Input
                  id="name"
                  saveInputDataHandler={saveInputDataHandler}
                  validations={[
                    requiredValidator(),
                    minValidator(8),
                    maxValidator(20),
                  ]}
                  element="input"
                  type="text"
                  placeholder="نام و نام خانوادگی"
                  className="loginInput form-control"
                />
              </div>
            </div>
            <div className="col-md-6">
              <div>
                <div className="addNewUserLable">نام کاربری</div>
                <Input
                  id="username"
                  saveInputDataHandler={saveInputDataHandler}
                  validations={[
                    requiredValidator(),
                    minValidator(6),
                    maxValidator(20),
                  ]}
                  element="input"
                  type="text"
                  placeholder="نام کاربری"
                  className="loginInput form-control"
                />
              </div>
            </div>
            <div className="col-md-6">
              <div>
                <div className="addNewUserLable">ایمیل</div>
                <Input
                  id="email"
                  saveInputDataHandler={saveInputDataHandler}
                  validations={[requiredValidator(), emailValidator()]}
                  element="input"
                  type="email"
                  placeholder="ایمیل"
                  className="loginInput form-control"
                />
              </div>
            </div>
            <div className="col-md-6">
              <div>
                <div className="addNewUserLable">رمز عبور</div>
                <Input
                  id="password"
                  saveInputDataHandler={saveInputDataHandler}
                  validations={[
                    requiredValidator(),
                    minValidator(8),
                    maxValidator(25),
                  ]}
                  element="input"
                  type="password"
                  placeholder="رمز عبور"
                  className="loginInput form-control"
                />
              </div>
            </div>
            <div className="col-md-6">
              <div>
                <div className="addNewUserLable">شماره تلفن</div>
                <Input
                  id="phone"
                  saveInputDataHandler={saveInputDataHandler}
                  validations={[requiredValidator(), phoneValidator()]}
                  element="input"
                  type="text"
                  placeholder="شماره تلفن"
                  className="loginInput form-control"
                />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="text-start ps-3">
              <button className="btn btn-primary" onClick={addNewUserHandler} disabled={!formState.isFormValid }>
                افزودن
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
