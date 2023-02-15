import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import swal from "sweetalert";
import DataTable from "../../../components/AdminPanel/DataTable/DataTable";
import "./AdminContacts.css";
import { BsCheckCircleFill } from "react-icons/bs";
export default function AdminContacts() {
  const [allContacts, setAllContacts] = useState([]);
  const [update, setUpdate] = useState(false);
  // useEffect =>
  useEffect(() => {
    fetch("http://localhost:4000/v1/contact")
      .then((res) => res.json())
      .then((allContacts) => {
        setAllContacts(allContacts);
      });
  }, [update]);

  // handlers =>
  const showContactHandler = (message) => {
    swal({
      title: message,
      buttons: " تایید",
    });
  };
  const sendAnwserHandler = (email) => {
    swal({
      title: "لطفا پاسخ خود را وارد کنید!",
      icon: "info",
      content: "input",
      buttons: "ارسال پاسخ",
    }).then((value) => {
      if (value) {
        // anwser request =>
        const anwserInfo = {
          email: email,
          answer: value,
        };

        fetch("http://localhost:4000/v1/contact/answer", {
          method: "POST",
          headers: {
            "Content-type": "Application/json",
            Authorization: `Bearer ${JSON.parse(
              localStorage.getItem("user-token")
            )}`,
          },
          body: JSON.stringify(anwserInfo),
        })
          .then((res) => {
            swal({
              title: "پاسخ شما با موفقیت ارسال شد",
              icon: "success",
              buttons: "تایید",
            });
            return res.json();
          })
          .then((data) => {
            setUpdate((prev) => !prev);
          });
      }
    });
  };
  const removeContactHandler = (id) => {
    swal({
      title: "حذف پیغام",
      icon: "error",
      text: "ایا از حذف این پیغام اطمینان دارید؟",
      buttons: ["خیر", "بله"],
    }).then((confirm) => {
      if (confirm) {
        // remove request =>
        fetch(`http://localhost:4000/v1/contact/${id}`, {
          method: "DELETE",
        }).then((res) => {
          if (res.ok) {
            swal({
              title: "پیغام با موفقیت حذف شد",
              icon: "success",
              buttons: "تایید",
            }).then(() => {
              // update dom
              setUpdate((prev) => !prev);
            });
          }
        });
      }
    });
  };
  return (
    <>
      <div className="container my-3">
        <div className="row">
          <DataTable title="لیست پیغام ها">
            <table className="table">
              <thead className="bg-light">
                <tr>
                  <th>وضعیت پاسخگویی</th>
                  <th>شناسه</th>
                  <th>نام و نام خانوادگی</th>
                  <th>ایمیل</th>
                  <th>شماره</th>
                  <th>مشاهده پیغام</th>
                  <th>پاسخ</th>
                  <th>حذف</th>
                </tr>
              </thead>
              <tbody>
                {allContacts.map((contact, index) => {
                  return (
                    <tr
                      key={contact._id}
                      className={`${
                        contact.answer == 1 ? "answeredQuestionStyle" : null
                      }`}
                    >
                      <td>
                        {contact.answer == 1 ? <BsCheckCircleFill /> : null}
                      </td>
                      <td>{index + 1}</td>
                      <td>{contact.name}</td>
                      <td>{contact.email}</td>
                      <td>{contact.phone}</td>
                      <td>
                        <button
                          className="btn btn-primary"
                          onClick={() => showContactHandler(contact.body)}
                        >
                          مشاهده پیغام
                        </button>
                      </td>
                      <td>
                        <button
                          className="btn btn-secondary"
                          onClick={() => sendAnwserHandler(contact.email)}
                        >
                          پاسخ
                        </button>
                      </td>
                      <td>
                        <button
                          className="btn btn-danger"
                          onClick={() => removeContactHandler(contact._id)}
                        >
                          حذف
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
    </>
  );
}
