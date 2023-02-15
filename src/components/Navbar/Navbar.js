import React, { useContext, useState, useEffect } from "react";
import "./Navbar.css";

// importing context storage
import AuthContext from "../../context/authContext";

// importing icons
import { BiSearchAlt2 } from "react-icons/bi";
import { BsFillCartFill } from "react-icons/bs";
import { Link } from "react-router-dom";

export default function Navbar() {
  const authContext = useContext(AuthContext);

  // states =>
  const [allMenuLinks, setAllMenuLinks] = useState([]);

  console.log('navbar rendered !');
  // useEffect =>
  useEffect(() => {
    fetch("http://localhost:4000/v1/menus")
      .then((res) => res.json())
      .then((data) => setAllMenuLinks(data));
  }, []);
  return (
    <>
      <div className="container-fluid">
        <div className="navbar d-flex justify-content-between rtl">
          <div className="navbarRight d-flex">
            <div>
              <Link to="/">
                <img
                  src="/images/mim-learn-logo.png"
                  alt="mim-learn.ir"
                  className="logo img-fluid"
                />
              </Link>
            </div>
            <ul className=" navbarList d-none d-lg-flex">
              {allMenuLinks.map((link) => {
                return (
                  <li key={link.id}>
                    <Link to={`${link.href}/1`}>{link.title}</Link>
                  </li>
                );
              })}
              
            </ul>
          </div>
          <div className="navbarLeft">
            <div>
              <button className="fill-theme-btn bg-theme-dark">
                <BiSearchAlt2 />
              </button>
              <button className="fill-theme-btn bg-theme-light text-dark mx-2">
                <BsFillCartFill />
              </button>
              {authContext.isLoggedIn ? (
                authContext.userInfos.role === 'USER' ? (
<Link to="/my-account">
                  <button className="outline-theme-btn">
                    {authContext.userInfos.name}
                  </button>
                </Link>
                ) : (
                  <Link to="/p-admin">
                  <button className="outline-theme-btn">
                    {authContext.userInfos.name}
                  </button>
                </Link>
                )
                
              ) : (
                <Link to="/login">
                  <button className="outline-theme-btn">ورود / ثبت نام</button>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
