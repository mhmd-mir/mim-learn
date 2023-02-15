import React, { useEffect } from "react";
import { useState } from "react";
import "./EditAccount.css";

import AuthContext from "../../../context/authContext";
import { useContext } from "react";
import swal from "sweetalert";
export default function EditAccount() {
  const authContext = useContext(AuthContext);

  // storaging inputs data in states =>
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setpassword] = useState("");

  useEffect(() => {
    setPhone(authContext.userInfos?.phone);
    setName(authContext.userInfos?.name);
    setUsername(authContext.userInfos?.username);
    setEmail(authContext.userInfos?.email);
  }, []);

  // handlers =>
  const editUserAccountHandler = () => {
    const EditedInfo = {
      phone,
      name,
      username,
      email,
      password,
    };

    fetch("http://localhost:4000/v1/users/", {
      method: "PUT",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${JSON.parse(
          localStorage.getItem("user-token")
        )}`,
      },
      body: JSON.stringify(EditedInfo),
    }).then(res => {
        if(res.ok){
            swal({
                title : 'تغییرات با موفقیت ثبت شد' , 
                icon : 'success' , 
                buttons : 'تایید' 
            }).then(() => {
                authContext.setUpdate(prev => !prev);
            })
        }
    })
  };
  
  return (
    <div className="p-3">
      <div className="inputs">
        <div className="row">
          <div className="col-12 my-1">
            <div>
              <div className="editAccountLable">شماره تلفن</div>
              <input
                type="text"
                value={phone}
                onChange={(event) => setPhone(event.target.value)}
                className="form-control"
              />
            </div>
          </div>
          <div className="col-12 my-1">
            <div>
              <div className="editAccountLable">نام و نام خانوادگی</div>
              <input
                type="text"
                value={name}
                onChange={(event) => setName(event.target.value)}
                className="form-control"
              />
            </div>
          </div>
          <div className="col-12 my-1">
            <div>
              <div className="editAccountLable">نام کاربری ( نمایشی )</div>
              <input
                type="text"
                className="form-control"
                value={username}
                onChange={(event) => setUsername(event.target.value)}
              />
            </div>
            <div>
              <p>نام شما به این صورت در حساب کاربری و نظرات دیده خواهد شد</p>
            </div>
          </div>
          <div className="col-12 my-1">
            <div>
              <div className="editAccountLable">ادرس ایمیل</div>
              <input
                type="text"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className="form-control"
              />
            </div>
          </div>
          <div className="mt-4">
            <div className="h5 pb-1">تغییر گذرواژه*</div>
            <hr />
          </div>
          <div className="col-12 my-1">
            <div>
              <div className="editAccountLable">گذرواژه جدید</div>
              <input
                type="text"
                className="form-control"
                value={password}
                onChange={(event) => setpassword(event.target.value)}
              />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="my-2">
            <button
              className="btn btn-primary"
              onClick={editUserAccountHandler}
            >
              ذخیره تغییرات
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
