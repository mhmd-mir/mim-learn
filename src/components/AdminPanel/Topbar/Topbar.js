import React, { useEffect } from "react";
import "./Topbar.css";

// icons
import { BiBell } from "react-icons/bi";
import { FaTrash } from "react-icons/fa";
import { useState } from "react";
import { useCallback } from "react";

export default function Topbar() {
  const [adminInfo, setAdminInfo] = useState({});
  const [adminNotifs, setAdminNotifs] = useState([]);
  const [update , setUpdate] = useState(false)
  // an state to handle notif box show
  const [isNotifBoxShow, setIsNotifBoxShow] = useState(false);




   // handlers :
  // remove notifs
  const removeNotif = useCallback((id) => {
    fetch(`http://localhost:4000/v1/notifications/see/${id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${JSON.parse(
          localStorage.getItem("user-token")
        )}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setUpdate(prev => !prev);
      });
  } , []) 


  // useEffect =>
  useEffect(() => {
    fetch(`http://localhost:4000/v1/auth/me`, {
      headers: {
        Authorization: `Bearer ${JSON.parse(
          localStorage.getItem("user-token")
        )}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setAdminInfo(data);
        setAdminNotifs(data.notifications);
      });
  }, [update]);

 
  return (
    <>
      <div className="panelTopbar d-flex justify-content-between align-items-center rtl p-2">
        <div className="d-flex align-items-center">
          <input
            type="text"
            placeholder="جستجو..."
            className="panelSearchInput"
          />
          <div className="position-relative">
            <BiBell
              className="bellIcon"
              onClick={() => setIsNotifBoxShow((prev) => !prev)}
            />
            {isNotifBoxShow && (
              <div className="notifications">
                {adminNotifs.length ? (
                  adminNotifs.map((notif) => {
                    return (
                      <>
                        <div className="notif">
                          <p>{notif.msg}</p>
                          <FaTrash
                            className="mx-2"
                            onClick={() => removeNotif(notif._id)}
                          />
                        </div>
                        <hr />
                      </>
                    );
                  })
                ) : (
                  <div className="alert alert-warning">
                    هیچ پیغامی موجود نیست!
                  </div>
                )}
              </div>
            )}
            {adminNotifs.length != 0 ? (
              <div className="badge bg-danger notifCounter">
                {adminNotifs.length}
              </div>
            ) : null}
          </div>
        </div>
        <div className="d-flex align-items-center">
          <div className="h5 m-0 mx-2">{adminInfo.name}</div>
          <div>
            <img
              style={{ width: 45 }}
              src={adminInfo.profile}
              className="rounded-circle mx-2"
            />
          </div>
        </div>
      </div>
    </>
  );
}
