import React from "react";
import Footer from "../../components/Footer/Footer";
import Navbar from "../../components/Navbar/Navbar";
import Topbar from "../../components/Topbar/Topbar";
import Input from "../../components/Input/Input";
import "./Contact.css";

// re-direct => 
import { useNavigate } from "react-router-dom";
// swal => 
import swal from 'sweetalert'

// importing roles
import {
  requiredValidator,
  minValidator,
  maxValidator,
  emailValidator,
  phoneValidator,
} from "./../../validations/rules";

// importing icons
import { FaUserAlt } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";
import { AiOutlinePhone } from "react-icons/ai";
import { AiOutlineMail } from "react-icons/ai";

// custom hooks =>
import { useForm } from "../../hooks/useForm";
export default function Contact() {
  const [formState, saveInputDataHandler] = useForm(
    {
      name: {
        value: "",
        isValid: false,
      },
      email: {
        value: "",
        isValid: false,
      },
      phone: {
        value: "",
        isValid: false,
      },
      txtarea : {
        value: "",
        isValid: false,
      }
    },
    false
  );

    const navigator = useNavigate();
  
  // sending message handler =>
  const sendMessageHandler = () => {
    const newMessage = {
      name: formState.inputsDetails.name.value ,
      email: formState.inputsDetails.email.value ,
      phone: formState.inputsDetails.phone.value ,
      body: formState.inputsDetails.txtarea.value 
    };

    fetch("http://localhost:4000/v1/contact", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(newMessage),
    }).then(res => res.json())
      .then(data => {
        swal({
            title: "پیغام شما با موفقیت ارسال شد" ,
            icon: "success",
            button: "تایید ",
        }).then(res => {
          navigator("/")
        })
      })
  };
  return (
    <>
      <Topbar />
      <Navbar />

      <div className="container mt-4 mb-3 rtl">
        <div className="row">
          <div className="login-register">
            <div className="loginSection contactSection bg-white rounded mx-auto p-3 shadow m-3 mt-5">
              {/* // login title */}
              <div>
                <div className="h5 text-center boldTxt">ارتباط با ما</div>
                <p className="text-center">
                  نظر ، انتقاد یا پیشنهادتو بنویس برامون :)
                </p>
              </div>
              {/* // login actions */}
              <div>
                <div className="position-relative my-2">
                  <Input
                    validations={[
                      requiredValidator(),
                      minValidator(8),
                      maxValidator(12),
                    ]}
                    element="input"
                    id="name"
                    saveInputDataHandler={saveInputDataHandler}
                    type="text"
                    placeholder="نام و نام خانوادگی"
                    className="loginInput form-control"
                  />
                  <FaUserAlt className="loginInputIcon" />
                </div>
                <div className="position-relative my-2">
                  <Input
                    validations={[phoneValidator()]}
                    element="input"
                    type="phone"
                    id="phone"
                    saveInputDataHandler={saveInputDataHandler}
                    placeholder="شماره تلفن"
                    className="loginInput form-control"
                  />
                  <AiOutlinePhone className="loginInputIcon" />
                </div>
                <div className="position-relative my-2">
                  <Input
                    validations={[requiredValidator(), emailValidator()]}
                    element="input"
                    type="email"
                    id="email"
                    saveInputDataHandler={saveInputDataHandler}
                    placeholder="ایمیل"
                    className="loginInput form-control"
                  />
                  <AiOutlineMail className="loginInputIcon" />
                </div>
                <div className="position-relative my-2">
                  <Input
                    validations={[requiredValidator(), minValidator(8)]}
                    element="textarea"
                    id="txtarea"
                    saveInputDataHandler={saveInputDataHandler}
                    placeholder="متن خود را وارد کنید"
                    className="loginInput form-control my-3 textareaHeight"
                  />
                </div>
                <div>
                  <button
                    className={`fill-theme-btn bgTheme w-100 py-2 ${
                      formState.isFormValid ? "bgTheme" : "disablesBg"
                    }`}
                    disabled={formState.isFormValid ? false : true}
                    onClick={sendMessageHandler}
                  >
                    ارسال
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
