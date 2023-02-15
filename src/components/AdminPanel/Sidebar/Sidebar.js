import React, { useState, useEffect, useContext } from "react";
import { Link, useLocation , useNavigate } from "react-router-dom";
import "./Sidebar.css";

// context
import AuthContext from './../../../context/authContext';

// swal 
import swal from 'sweetalert'

// icons
import { IoIosCloseCircleOutline } from "react-icons/io";
import { AiOutlineMenu } from "react-icons/ai";
export default function Sidebar() {
  const [isShowSidebar, setIsShowSidebar] = useState(true);
  const [currentUrl, setCurrentUrl] = useState("/p-admin");
  const locationInfo = useLocation();
  // context
  const authContext = useContext(AuthContext)
   // useNavigate
   const navigator = useNavigate();
  // useEffect
  useEffect(() => {
    // locationInfo.pathname
    setCurrentUrl(locationInfo.pathname);
  }, [locationInfo.pathname]);


  // handler
  const logOutHandler = () => {
    swal({
      title : 'خروج از حساب کاربری' , 
      text : 'ایا میخواهید از حساب کاربری خود خارج شوید'  ,
      icon : 'info' ,
      buttons : ['خیر' , 'بله']
    }).then(res => {
      if(res){
        // logOut logic
        authContext.logout();
        authContext.setUpdate(prev => !prev)
        navigator('/')
      }
    })
  }
  return (
    <div className="position-relative">
      <div
        className="sidebar"
        style={!isShowSidebar ? { minHeight: "auto" } : null}
      >
        <div className="border-bottom border-secondary pb-3">
          <Link to="/">
            <img
              src="/images/logo/Logo.png"
              alt="sabzlearn"
              className="panelBrand"
            />
          </Link>
        </div>
        {isShowSidebar && (
          <div className="mt-3">
            <ul className="flatUl panelItems">
              <li
                className={currentUrl === "/p-admin" ? "panelActiveLink" : null}
              >
                <Link to="/p-admin">صفحه اصلی</Link>
              </li>
              <li
                className={
                  currentUrl === "/p-admin/courses" ? "panelActiveLink" : null
                }
              >
                <Link to="courses">دوره ها</Link>
              </li>
              <li
                className={
                  currentUrl === "/p-admin/sessions" ? "panelActiveLink" : null
                }
              >
                <Link to="sessions">جلسات</Link>
              </li>
              <li
                className={
                  currentUrl === "/p-admin/menus" ? "panelActiveLink" : null
                }
              >
                <Link to="menus">منو ها</Link>
              </li>
              <li
                className={
                  currentUrl === "/p-admin/articles" ? "panelActiveLink" : null
                }
              >
                <Link to="articles">مقاله ها</Link>
              </li>
              <li
                className={
                  currentUrl === "/p-admin/users" ? "panelActiveLink" : null
                }
              >
                <Link to="users">کاربران</Link>
              </li>
              <li
                className={
                  currentUrl === "/p-admin/discounts" ? "panelActiveLink" : null
                }
              >
                <Link to="discounts">کد های تخفیف</Link>
              </li>
              <li
                className={
                  currentUrl === "/p-admin/categories" ? "panelActiveLink" : null
                }
              >
                <Link to="categories">دسته بندی ها</Link>
              </li>
              <li
                className={
                  currentUrl === "/p-admin/comments" ? "panelActiveLink" : null
                }
              >
                <Link to="comments">کامنت ها</Link>
              </li>
              <li
                className={
                  currentUrl === "/p-admin/tickets" ? "panelActiveLink" : null
                }
              >
                <Link to="tickets">تیکت ها</Link>
              </li>
              <li
                className={
                  currentUrl === "/p-admin/contacts" ? "panelActiveLink" : null
                }
              >
                <Link to="contacts">پیغام ها</Link>
              </li>
              <li onClick={logOutHandler}>
                <Link> خروج</Link>
              </li>
            </ul>
          </div>
        )}
      </div>
      {isShowSidebar ? (
        <IoIosCloseCircleOutline
          className="closeSidebar"
          onClick={() => setIsShowSidebar((prev) => !prev)}
        />
      ) : (
        <AiOutlineMenu
          className="closeSidebar"
          onClick={() => setIsShowSidebar((prev) => !prev)}
        />
      )}
    </div>
  );
}
