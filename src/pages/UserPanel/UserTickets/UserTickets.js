import React, { useEffect } from "react";
import "./UserTickets.css";
import { Link } from "react-router-dom";
// icons =>
import { HiOutlineTicket } from "react-icons/hi";
import { useState } from "react";

export default function UserTickets() {
  const [allTickets, setAllTickets] = useState([]);
  // useEffect =>
  useEffect(() => {
    fetch(`http://localhost:4000/v1/tickets`, {
      headers: {
        Authorization: `Bearer ${JSON.parse(
          localStorage.getItem("user-token")
        )}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setAllTickets(data);
      });
  }, []);
  return (
    <div className="p-3">
      <div className="rtl">
        <div className="h5">همه تیکت ها</div>
        <div className="text-start pb-2 border-bottom">
          <Link to="/my-account/send-ticket">
          <button className="btn btn-success">ارسال تیکت جدید</button>
          </Link>
        </div>
        <div className="d-flex flex-column flex-md-row">
          <div className="ticketInfoBox text-center">
            <div>
              <HiOutlineTicket className="ticketIcon" />
            </div>
            <div className="boldTxt">باز</div>
            <div>3</div>
          </div>
          <div className="ticketInfoBox text-center">
            <div>
              <HiOutlineTicket className="ticketIcon" />
            </div>
            <div className="boldTxt">بسته</div>
            <div>2</div>
          </div>
          <div className="ticketInfoBox text-center">
            <div>
              <HiOutlineTicket className="ticketIcon" />
            </div>
            <div className="boldTxt">پاسخ داده </div>
            <div>2</div>
          </div>
          <div className="ticketInfoBox text-center">
            <div>
              <HiOutlineTicket className="ticketIcon" />
            </div>
            <div className="boldTxt">پایان یافته</div>
            <div>2</div>
          </div>
          <div className="ticketInfoBox text-center">
            <div>
              <HiOutlineTicket className="ticketIcon" />
            </div>
            <div className="boldTxt">همه</div>
            <div>2</div>
          </div>
        </div>
      </div>
      {/* // all tickets */}
      <div className="py-3 rtl">
        {allTickets.length == 0 ? (
          <div className="alert alert-warning">هیچ تیکتی موجود نیست!</div>
        ) : (
          allTickets.map((ticket) => (
            <div className="ticketBox d-flex justify-content-between align-items-center">
              <div>
                <div className="boldTxt">
                    <Link className="flatLink" to={`/my-account/ticketPage/${ticket._id}`}>{ticket.title}</Link>
                  </div>
                <div className="d-flex align-items-center">
                  <div className="depTicket">{ticket.departmentID}</div>
                  <div className="mx-2">{ticket.user}</div>
                </div>
              </div>
              <div>
                <div className="d-flex">
                  <div className="d-flex align-items-center ">
                    <span className={`state ${ticket.answer == 1 ? 'bg-success' : 'bg-danger'}`}></span>
                    <span className="mx-1">
                        {
                            ticket.answer == 1 ? 'پاسخ داده شده' : 'در انتظار پاسخ'
                        }
                    </span>
                  </div>
                  <div className="mx-3 boldTxt">{ticket.createdAt?.slice(0,10)}</div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
