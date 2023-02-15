import React from "react";

import { Link } from "react-router-dom";
import Input from "../Input/Input";
import "./Footer.css";

// rules =>
import { emailValidator } from "./../../validations/rules";

// custom hooks =>
import { useForm } from "../../hooks/useForm";
import swal from "sweetalert";
export default function Footer() {
  const [formState, saveInputDataHandler] = useForm(
    {
      email: {
        value: "",
        isValid: false,
      },
    },
    false
  );


  // add_New_Email_Handler 
  const addNewEmailHandler = () => {
    fetch('http://localhost:4000/v1/newsletters' , {
      method : "POST" , 
      headers : {
        'Content-Type' : 'application/json'
      },
      body : JSON.stringify({
        email : formState.inputsDetails.email.value 
      })
    }).then(res => {
      if(res.ok){
        swal({
          title: "عضویت در خبرنامه با موفقیت انجام شد" ,
          icon: "success",
          button: "تایید ",
        })
      }
    })
  } 

  return (
    <>
      <div className="footer container p-4 rounded footerBg rtl">
        <div className="row">
          <div className="col-lg-4">
            <div className="footerItem">
              <div className="h5">درباره ما</div>
              <div>
                <p className="p-2">
                  وقتی تازه شروع به یادگیری برنامه نویسی کردم. یکی از مشکلاتی که
                  در فرآیند یادگیری داشتم، کمبود آموزش های خوب با پشتیبانی قابل
                  قبول بود که باعث شد اون موقع تصمیم بگیرم اگر روزی توانایی مالی
                  و فنی قابل قبولی داشتم یک وب سایت برای حل این مشکل راه اندازی
                  کنم! و خب امروز آکادمی آموزش برنامه نویسی سبزلرن به عنوان یک
                  آکادمی خصوصی فعالیت میکنه و این به این معنی هست که هر مدرسی
                  اجازه تدریس در اون رو نداره و باید از فیلترینگ های خاص آکادمی
                  سبزلرن رد شه! این به این معنی هست که ما برامون فن بیان و نحوه
                  تعامل مدرس با دانشجو بسیار مهمه! ما در آکادمی سبزلرن تضمین
                  پشتیبانی خوب و با کیفیت رو به شما میدیم . چرا که مدرسین وب
                  سایت سبزلرن حتی برای پشتیبانی دوره های رایگان شون هم هزینه
                  دریافت میکنند و متعهد هستند که هوای کاربر های عزیز رو داشته
                  باشند
                </p>
              </div>
            </div>
          </div>
          <div className="col-lg-4">
            <div className="h5">اخرین مطالب</div>
            <div className="lastAtriclesSection">
              <ul>
                <li>
                  <a href="#">
                    نحوه نصب کتابخانه در پایتون | اموزش نصب کتابخانه
                  </a>
                </li>
                <li>
                  <a href="#">
                    اموزش نصب پایتون ( python ) در مک ویندوز لینکوس | گام به گام
                  </a>
                </li>
                <li>
                  <a href="#">بهترین فریمورک های فرانت اند</a>
                </li>
                <li>
                  <a href="#">معرفی بهترین سایت های اموزش جاوااسکریپت</a>
                </li>
                <li>
                  <a href="#">
                    چگونه پایتون را اپدیت کنیم | صفر تا صد بروزرسانی پایتون
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-lg-4">
            <div className="h5">دسترسی سریع</div>
            <div className="accessLinks mt-3">
              <div className="row my-2">
                <div className="col-6">
                  <a href="#">اموزش html</a>
                </div>
                <div className="col-6">
                  <a href="#">اموزش css</a>
                </div>
              </div>
              <div className="row my-2">
                <div className="col-6">
                  <a href="#">اموزش جاوااسکریپت</a>
                </div>
                <div className="col-6">
                  <a href="#">اموزش بوتسترپ</a>
                </div>
              </div>
              <div className="row my-2">
                <div className="col-6">
                  <a href="#">اموزش ریکت</a>
                </div>
                <div className="col-6">
                  <a href="#">اموزش پایتون</a>
                </div>
              </div>
              <div className="row my-2">
                <div className="col-6">
                  <Link to="/contact">ارتباط با ما</Link>
                </div>
              </div>
            </div>
            <div className="h5 mt-4 mb-2">عضویت در خبرنامه</div>
            <div className="position-relative">
              <Input
                element="input"
                validations={[emailValidator()]}
                id="email"
                type="email"
                className="form-control"
                placeholder="ایمیل خود را وارد کنید"
                saveInputDataHandler={saveInputDataHandler}
              />
              <button
                className="btn btn-secondary newsLeter"
                disabled={!formState.isFormValid}
                onClick={addNewEmailHandler}
              >
                عضویت
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* // copyRight */}
      <div className="container-fluid mt-5 footerBg">
        <div className="row">
          <div className="text-center p-3 h6">
            کلیه حقوق برای
            <a href="#" className="copyRight">
              {" "}
              اکادمی برنامه نویسی میم لرن
            </a>{" "}
            محفوظ است
          </div>
        </div>
      </div>
    </>
  );
}
