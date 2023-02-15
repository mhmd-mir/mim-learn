import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import "./Index.css";
// importing components
import Sidebar from "../../components/AdminPanel/Sidebar/Sidebar";
import Topbar from "../../components/AdminPanel/Topbar/Topbar";

import AuthContext from "../../context/authContext";
import { useContext } from "react";
import { useEffect } from "react";
export default function Index() {



  const authContext = useContext(AuthContext)
  const navigator = useNavigate()
  
  useEffect(() => {
    
    // if(!(authContext.userInfos?.role === 'ADMIN')){
    //   navigator('/login')
    // }
  })
  return (
    <>
    {authContext.userInfos == null ? null : (
      authContext.userInfos.role === 'ADMIN' ? null : (
        navigator('/')
      )
    )}
      <div className="container-fluid rtl">
        <div className="row">
          <div className="col-lg-2 p-0">
            <Sidebar />
          </div>
          <div className="col-lg-10 ">
            <Topbar />
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
}
