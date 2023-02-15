import React, { useEffect } from "react";
import "./TicketPage.css";

// icons
import { GoPlay } from "react-icons/go";

import { useParams } from "react-router-dom";
import { useState } from "react";
export default function TicketPage() {
  const [ticketInfo, setTicketInfo] = useState({});

  const { id } = useParams();

  useEffect(() => {
    fetch(`http://localhost:4000/v1/tickets/answer/${id}`, {
      headers: {
        Authorization: `Bearer ${JSON.parse(
          localStorage.getItem("user-token")
        )}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setTicketInfo(data);
      });
  }, []);
  return (
    <div className="p-3 rtl">
      <div className="boldTxt pb-2 border-bottom">تیکت شما</div>
      <div className="my-3 d-flex align-items-center">
        <GoPlay className="playIcon" />
        <div className="mx-2">
          <div className="h5 m-0 mb-1"> تیکت های من</div>
          <div>شناسه تیکت : 45011</div>
        </div>
      </div>
      <hr />
      <div className="questionPart my-4">
        <div className="rtlMessageBox">{ticketInfo.ticket}</div>
        <div className="msgInfo d-flex align-items-center">
          <span className="boldTxt">محمد امین سعیدی راد </span>
          <span className="mx-2 my-1">2022-12-04</span>
        </div>
      </div>
      <hr />
      {ticketInfo.answer ? (
        <div className="questionPart my-4 text-start d-flex align-items-end flex-column">
          <div className="ltrMessageBox mr-auto">
          {ticketInfo.answer}
          </div>
          <div className="msgInfo d-flex justify-content-start">
            <span className="boldTxt">محمد امین سعیدی راد </span>
            <span className="mx-2 my-1">2022-12-04</span>
          </div>
        </div>
      ) : (
        <div className="alert alert-danger">هنوز پاسخی ثبت نشده</div>
      )}
    </div>
  );
}
