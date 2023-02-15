import React from "react";
import "./Sidebar.css";
import { Link } from "react-router-dom";

import swal from "sweetalert";

import { useContext } from "react";
import AuthContext from "../../../context/authContext";
import { useNavigate } from "react-router-dom";
export default function Sidebar() {
  const authContext = useContext(AuthContext)
  const navigator = useNavigate()
  // handler => 
  const logOutHandler = (event) => {
    event.preventDefault();
    swal({
      title : 'خروج از حساب کاربری'  ,
      text : 'ایا از خروج اطمینان دارید ؟' , 
      icon : 'warning' , 
      buttons : ["خیر" , "بله"]
    }).then(confirm => {
      if(confirm){
        authContext.logout();
        navigator('/')
      }
    })
  }
  return (
    <>
      <ul className="flatUl userSidebar">
        <li className="my-3">
          <Link to="" className="flatLink">
            پیشخوان
          </Link>
        </li>
        <li className="my-3">
          <Link to="orders" className="flatLink">
            سفارش ها
          </Link>
        </li>
        <li className="my-3">
          <Link to="" className="flatLink">
            کیف پول من
          </Link>
        </li>
        <li className="my-3">
          <Link to="edit-account" className="flatLink">
            جزعیات حساب کاربری
          </Link>
        </li>
        <li className="my-3">
          <Link to="courses" className="flatLink">
            دوره های خریداری شده
          </Link>
        </li>
        <li className="my-3">
          <Link to="tickets" className="flatLink">
            تیکت های پشتیبانی
          </Link>
        </li>
        <li className="my-3">
          <Link className="flatLink" onClick={logOutHandler}>
            خروج از سیستم
          </Link>
        </li>
      </ul>
    </>
  );
}
