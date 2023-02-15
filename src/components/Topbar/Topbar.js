import React, { useEffect, useState } from "react";
import "./Topbar.css";

import { Link } from "react-router-dom";

import { memo } from "react";

// importing icons
import { AiOutlineMail } from "react-icons/ai";
import { AiOutlinePhone } from "react-icons/ai";
import { AiOutlineMenu } from "react-icons/ai";
import { AiOutlineClose } from "react-icons/ai";

const Topbar = memo(() => {
  const [isMenuShow, setIsShowMenu] = useState(true);
  const [allTopbarLinks, setAllTopbarLinks] = useState([]);

  const makeRandomLinks = (linksArr, count) => {
    const shuffled = [...linksArr].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  };

  // useEffect =>
  useEffect(() => {
    fetch("http://localhost:4000/v1/menus/topbar")
      .then((res) => res.json())
      .then((data) => setAllTopbarLinks(data));
  }, []);
  return (
    <>
      <div className="container-fluid topbarBg pb-1">
        <div className="topbar d-flex justify-content-between rtl">
          <div className="topbarRight">
            {isMenuShow && (
              <ul className="topbarList">
                <div className="text-start closeParent">
                  <AiOutlineClose
                    className="closeMenu"
                    onClick={() => setIsShowMenu(false)}
                  />
                </div>
                {makeRandomLinks(allTopbarLinks, 5).map((link) => {
                  return (
                    <li className="listItem" key={link.id}>
                      <Link to={link.href}>{link.title}</Link>
                    </li>
                  );
                })}
              </ul>
            )}
            <AiOutlineMenu
              className="hambergerMenu"
              onClick={() => setIsShowMenu(true)}
            />
          </div>
          <div className="topbarLeft">
            <div className="d-sm-flex p-2">
              <div className="d-flex justify-content-center mx-2 align-items-center">
                <p className="larger m-0 darkColor">mimlearn@gmail.com</p>
                <AiOutlineMail className="topbarIcons" />
              </div>
              <div className="d-flex justify-content-center mx-2">
                <p className="larger m-0 darkColor">09915561298</p>
                <AiOutlinePhone className="topbarIcons" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
});

export default Topbar;
