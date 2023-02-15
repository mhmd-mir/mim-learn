import React from "react";
import "./BreadCrumb.css";

import { Link } from "react-router-dom";

// importing icons
import { AiFillHome } from "react-icons/ai";
import { IoIosArrowBack } from "react-icons/io";

export default function BreadCrumb({ links }) {
  return (
    <>
      <div className="p-3 lightThemeBg d-flex align-items-center rtl rounded">
        <div>
          <AiFillHome className="breadCrumbIcon" />
        </div>
        <div>
          <ul className="breadCrumbLinks">
            {/* <li>
              <a href="#">{links[0].title}</a>
            </li>
            <IoIosArrowBack /> */}
            {links.map((link, index) => {
              return (
                <>
                  {index + 1 !== links.length ? (
                    <>
                      <li key={link.id}>
                        <Link to={link.to}>{link.title}</Link>
                      </li>
                      <IoIosArrowBack />
                    </>
                  ) : (
                    <>
                      <li key={link.id}>
                        <Link to={link.to}>{link.title}</Link>
                      </li>
                    </>
                  )}
                </>
              );
            })}
          </ul>
        </div>
      </div>
    </>
  );
}
