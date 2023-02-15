import React , {useState} from "react";
import Navbar from "../../components/Navbar/Navbar";
import Topbar from "../../components/Topbar/Topbar";
import Footer from "./../../components/Footer/Footer";
import Input from "./../../components/Input/Input";
import { Link, useNavigate } from "react-router-dom";

import "./Register.css";

// import custom Hooks
import { useForm } from "../../hooks/useForm";
// importing capcha
import ReCAPTCHA from "react-google-recaptcha";
// importing hooks
import { useContext } from "react";
import AuthContext from "../../context/authContext";
// importing validations
import {
  requiredValidator,
  minValidator,
  maxValidator,
  emailValidator,
  phoneValidator
} from "./../../validations/rules";

// importing icons
import { FaUserAlt } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";
import { AiFillMail } from "react-icons/ai";
import { MdOutlineDriveFileRenameOutline } from "react-icons/md";
import {AiFillPhone} from 'react-icons/ai'
// importing modules
import swal from "sweetalert";
export default function Register() {
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
      phone: {
        value: "",
        isValid: false,
      },
      password: {
        value: "",
        isValid: false,
      },
    },
    false
  );
  const [isCaptchaVerify , setIsCaptchaVerify] = useState(false)
  const navigator = useNavigate();
  // context =>
  const authContext = useContext(AuthContext);
  // onclick handler => register user
  const registerUserHandler = () => {
    const newUser = {
      name: formState.inputsDetails.name.value,
      username: formState.inputsDetails.username.value,
      email: formState.inputsDetails.email.value,
      phone: formState.inputsDetails.phone.value,
      password: formState.inputsDetails.password.value,
      confirmPassword: formState.inputsDetails.password.value,
    };

    fetch("http://localhost:4000/v1/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newUser),
    })
      .then((res) => {
        if(res.ok){
          return res.json()
        }else{
          if(res.status == 403){
            swal({
              title : 'این شماره تلفن مسدود شده است'  ,
              icon : 'error' , 
              button : 'باشه'
            })
          }
        }
      })
      .then((data) => {
        authContext.login(data.user, data.accessToken);
        swal({
          title: "ثبت نام با موفقیت انجام شد",
          icon: "success",
          button: "ورود به پنل",
        }).then((res) => {
          navigator("/");
        });
      });
  };
  // captcha handler
  const captchaChangeHandler = () => {
    setIsCaptchaVerify(true)
  }
  return (
    <>
      <Topbar />
      <Navbar />
      <div className="container mt-4 mb-3 rtl">
        <div className="row">
          <div className="login-register">
            <div className="loginSection bg-white rounded mx-auto p-3 shadow m-3 mt-5">
              {/* // login title */}
              <div>
                <div className="h5 text-center boldTxt">ساخت حساب کاربری</div>
                <p className="text-center">
                  خوشحالیم قراره به جمع ما بپیوندی :)
                </p>
              </div>
              {/* // login redirect section */}
              <div>
                <div className="my-2 px-2 py-3 rounded bg-theme-light text-center">
                  قبلا ثبت نام کرده اید؟{" "}
                  <Link
                    to="/login"
                    className="text-white flatLink badge bg-secondary p-2"
                  >
                    ورود
                  </Link>
                </div>
              </div>
              {/* // login actions */}
              <div>
                <div className="position-relative my-2">
                  <Input
                    id="name"
                    saveInputDataHandler={saveInputDataHandler}
                    validations={[
                      requiredValidator(),
                      minValidator(6),
                      maxValidator(20),
                    ]}
                    element="input"
                    type="text"
                    placeholder="نام و نام خانوادگی "
                    className="loginInput form-control"
                  />
                  <MdOutlineDriveFileRenameOutline className="loginInputIcon" />
                </div>
                <div className="position-relative my-2">
                  <Input
                    id="username"
                    saveInputDataHandler={saveInputDataHandler}
                    validations={[
                      requiredValidator(),
                      minValidator(8),
                      maxValidator(20),
                    ]}
                    element="input"
                    type="text"
                    placeholder="نام کاربری "
                    className="loginInput form-control"
                  />
                  <FaUserAlt className="loginInputIcon" />
                </div>
                <div className="position-relative my-2">
                  <Input
                    saveInputDataHandler={saveInputDataHandler}
                    id="email"
                    validations={[requiredValidator(), emailValidator()]}
                    element="input"
                    type="text"
                    placeholder="ادرس ایمیل"
                    className="loginInput form-control"
                  />
                  <AiFillMail className="loginInputIcon" />
                </div>
                <div className="position-relative my-2">
                  <Input
                    saveInputDataHandler={saveInputDataHandler}
                    id="phone"
                    validations={[requiredValidator(), phoneValidator()]}
                    element="input"
                    type="text"
                    placeholder="شماره تلفن"
                    className="loginInput form-control"
                  />
                  <AiFillPhone className="loginInputIcon" />
                </div>
                <div className="position-relative my-2">
                  <Input
                    saveInputDataHandler={saveInputDataHandler}
                    id="password"
                    validations={[requiredValidator(), minValidator(8)]}
                    element="input"
                    type="password"
                    placeholder="رمز عبور"
                    className="loginInput form-control"
                  />
                  <RiLockPasswordFill className="loginInputIcon" />
                </div>
                <div className="position-relative my-2">
                <ReCAPTCHA
                    sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"
                    onChange={captchaChangeHandler}
                  />
                </div>
                <div>
                  <button
                    onClick={registerUserHandler}
                    disabled={(formState.isFormValid && isCaptchaVerify) ? false : true}
                    className={`fill-theme-btn bgTheme w-100 py-2 ${
                      (formState.isFormValid && isCaptchaVerify) ? "" : "disablesBg"
                    }`}
                  >
                    عضویت
                  </button>
                </div>
              </div>
              {/* // securety tips */}
              <div className="mt-5 smallFont">
                <p>سلام کاربر محترم :</p>
                <ul>
                  <li>
                    لظفا از مرورگر های مطمعن و بروز مانند گوگل کروم و فایرفاکس
                    استفاده کنید
                  </li>
                  <li>
                    ما هرگز اطلاعات محرمانه شمارا از طریق ایمیل درخواست نمیکنیم
                  </li>
                  <li>لطفا رمز عبور خود را در فواصل زمانی کوتاه تغییر دهید</li>
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
