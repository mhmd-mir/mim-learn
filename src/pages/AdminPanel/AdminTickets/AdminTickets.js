import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import swal from "sweetalert";
import DataTable from "../../../components/AdminPanel/DataTable/DataTable";

export default function AdminTickets() {
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/v1/tickets", {
      headers: {
        Authorization: `Bearer ${JSON.parse(
          localStorage.getItem("user-token")
        )}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setTickets(data));
  }, []);

  // handlers :
  const showTicketBody = (ticketBody) => {
    swal({
      title: ticketBody,
      buttons: "تایید",
    });
  };
  const answerTicketHandler = (id) => {
    swal({
      title: "پاسخ خود را تایپ کنید",
      content: "input",
      buttons: "ارسال پاسخ",
    }).then((answer) => {
      if (answer) {
        const answerInfo = {
          ticketID: id,
          body: answer,
        };
        fetch("http://localhost:4000/v1/tickets/answer", {
          method: "POST",
          headers: {
            "Content-Type": "Application/json",
            Authorization: `Bearer ${JSON.parse(
              localStorage.getItem("user-token")
            )}`,
          },
          body : JSON.stringify(answerInfo)
        }).then(res => {
            if(res.ok){
                swal({
                    title : 'پاسخ شما با موفقیت ارسال شد' , 
                    icon : 'success' , 
                    buttons : 'تایید'
                })
            }
        })
      }
    });
  };
  return (
    <div className="container my-3">
      <div className="row">
        <DataTable title="لیست تیکت ها">
          <table className="table">
            <thead className="bg-light">
              <tr className="text-center">
                <th>شناسه</th>
                <th>کاربر</th>
                <th>عنوان</th>
                <th>نوع تیکت</th>
                <th>اولویت</th>
                <th>مشاهده</th>
                <th>پاسخ</th>
              </tr>
            </thead>
            <tbody>
              {tickets.map((ticket, index) => {
                return (
                  <tr key={ticket._id} className="text-center">
                    <td>{index + 1}</td>
                    <td>{ticket.user}</td>
                    <td>{ticket.title}</td>
                    <td>{ticket.departmentSubID}</td>
                    <td>
                      {ticket.priority === 1 ? "زیاد" : null}
                      {ticket.priority === 2 ? "متوسط" : null}
                      {ticket.priority === 3 ? "کم" : null}
                    </td>
                    <td>
                      <button
                        className="btn btn-primary"
                        onClick={() => showTicketBody(ticket.body)}
                      >
                        مشاهده
                      </button>
                    </td>
                    <td>
                      <button
                        className="btn btn-secondary"
                        onClick={() => answerTicketHandler(ticket._id)}
                      >
                        پاسخ
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </DataTable>
      </div>
    </div>
  );
}
