import React , {useState} from "react";
import "./Landing.css";

// importing icons
import { BiSearchAlt2 } from "react-icons/bi";
import { FiUserPlus } from "react-icons/fi";
import { SiGitbook } from "react-icons/si";
import { GiClockwork } from "react-icons/gi";
import LandingCounter from "../LandingCounter/LandingCounter";
import { useNavigate } from "react-router-dom";


// 
import AuthContext from "../../context/authContext";
import { useContext } from "react";
export default function Landing() {
  const authContext = useContext(AuthContext);
  const [searchedValue , setSearchedValue] = useState('');
  const navigate = useNavigate();
  const goToSearchPage = () => {
    navigate(`/search/${searchedValue}`);
  }
  console.log(authContext.indexPageInfo);
  return (
    <>
      <div className="container-fluid p-4 rtl landingBg">
        <div className="landingTitles text-center mt-5">
          <div className="h3">میم لرن - اکادمی تخصصی اموزش برنامه نویسی</div>
          <p>با میم لرن با خیال راحت برنامه نویسی یاد بگیر و حالشو ببر</p>
        </div>
        <div className="text-center my-5">
          <div className="position-relative  w-50  landingSearch">
            <input
              type="search"
              placeholder="چی دوست داری یاد بگیری..."
              className="w-100 landingSearchInput"
              value={searchedValue}
              onChange={(event) => setSearchedValue(event.target.value)}
            />
            <button className="landingSearchBtn" onClick={goToSearchPage}>
              <BiSearchAlt2 />
            </button>
          </div>
        </div>
        <div className="d-flex justify-content-center">
          <LandingCounter count={authContext.indexPageInfo?.usersCount} txt="کاربر توی میم لرن ثبت نام کردند">
            <SiGitbook />
          </LandingCounter>
          <LandingCounter count={authContext.indexPageInfo?.coursesCount} txt="دوره اموزشی داریم">
            <SiGitbook />
          </LandingCounter>
          <LandingCounter count={authContext.indexPageInfo?.totalTime} txt="دقیقه اموزش تولید کردیم">
            <GiClockwork />
          </LandingCounter>
        </div>
      </div>
    </>
  );
}
