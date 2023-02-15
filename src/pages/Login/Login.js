import React, { useContext, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import Topbar from "../../components/Topbar/Topbar";
import Footer from "./../../components/Footer/Footer";
import Input from "./../../components/Input/Input";
import { Link } from "react-router-dom";
import "./Login.css";

// importing capcha
import ReCAPTCHA from "react-google-recaptcha";
// import mudoles
import swal from "sweetalert";

// import contexts storage
import AuthContext from "../../context/authContext";
// validation rules
import {
  requiredValidator,
  minValidator,
  maxValidator,
  emailValidator,
} from "./../../validations/rules";

// importing custom hooks
import { useForm } from "../../hooks/useForm";
// importing hooks
import { useNavigate } from "react-router-dom";
// importing icons
import { FaUserAlt } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";

export default function Login() {
  const [formState, saveInputDataHandler] = useForm(
    {
      username: {
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
  // navigator => redirecting function
  const navigator = useNavigate();

  const authContext = useContext(AuthContext);
  // handlers
  // login handler =>
  const loginHandler = () => {
    const newUser = {
      identifier: formState.inputsDetails.username.value,
      password: formState.inputsDetails.password.value,
    };

    fetch("http://localhost:4000/v1/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newUser),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          swal({
            title: "کاربر یافت نشد!",
            icon: "error",
            text: "نام کاربری یا رمز عبور اشتباه است !",
            button: "تلاش دوباره",
          });
        }
      })
      .then((data) => {
        authContext.login({}, data.accessToken);
        authContext.setUpdate((prev) => !prev);
        swal({
          title: "ورود با موفقیت انجام شد",
          icon: "success",
          button: "ورود به پنل",
        }).then((res) => {
          navigator("/");
        });
      });
  };
  // capcha handler => 
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
                <div className="h5 text-center boldTxt">
                  ورود به حساب کاربری
                </div>
                <p className="text-center">
                  خوشحالیم دوباره میبینیمت دوست عزیز :)
                </p>
              </div>
              {/* // login redirect section */}
              <div>
                <div className="my-2 px-2 py-3 rounded bg-theme-light text-center">
                  کاربر جدید هستید؟{" "}
                  <Link
                    to="/register"
                    className="text-white flatLink badge bg-secondary p-2"
                  >
                    ثبت نام
                  </Link>
                </div>
              </div>
              {/* // login actions */}
              <div>
                <div className="position-relative my-2">
                  <Input
                    validations={[requiredValidator()]}
                    element="input"
                    id="username"
                    saveInputDataHandler={saveInputDataHandler}
                    type="text"
                    placeholder="نام کاربری یا ایمیل"
                    className="loginInput form-control"
                  />
                  <FaUserAlt className="loginInputIcon" />
                </div>
                <div className="position-relative my-2">
                  <Input
                    validations={[
                      requiredValidator(),
                      minValidator(8),
                      maxValidator(12),
                    ]}
                    element="input"
                    type="password"
                    id="password"
                    saveInputDataHandler={saveInputDataHandler}
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
                    onClick={loginHandler}
                    className={`fill-theme-btn bgTheme w-100 py-2 ${
                      (formState.isFormValid && isCaptchaVerify) ? "bgTheme" : "disablesBg"
                    }`}
                    disabled={(formState.isFormValid && isCaptchaVerify) ? false : true}
                  >
                    ورود
                  </button>
                </div>
                <div className="d-flex justify-content-between align-items-center mt-2">
                  <div className="d-flex align-items-center">
                    <input type="checkbox" className="ms-2 " />
                    <span className="text-bold">مرا به خاطر بسپار</span>
                  </div>
                  <div>
                    <a href="#" className="flatLink">
                      رمز عبور را فراموش کرده اید؟
                    </a>
                  </div>
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
