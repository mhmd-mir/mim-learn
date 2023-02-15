import React, { useEffect, useState } from "react";
import DataTable from "../../../components/AdminPanel/DataTable/DataTable";
import swal from "sweetalert";
export default function AdminComments() {
  const [allComment, setAllComment] = useState([]);
  const [update, setUpdate] = useState(false);
  // useEffect =>
  useEffect(() => {
    fetch("http://localhost:4000/v1/comments")
      .then((res) => res.json())
      .then((data) => {
        setAllComment(data);
      });
  }, [update]);

  // return =>
  const showCommentBodyHandler = (commentBody) => {
    swal({
      title: commentBody,
      icon: "info",
      buttons: "تایید",
    });
  };
  const answerCommentHandler = (id) => {
    swal({
      title: "پاسخ خود را وارد کنید",
      content: "input",
      buttons: "ارسال پاسخ",
    }).then((answer) => {
      if (answer) {
        fetch(`http://localhost:4000/v1/comments/answer/${id}`, {
          method: "POST",
          headers: {
            Authorization : `Bearer ${JSON.parse(
              localStorage.getItem("user-token")
            )}`,
            "Content-type": "application/json",
          },
          body : JSON.stringify({ body : answer }),
        }).then((res) => {
          console.log(res);
          if (res.ok) {
            swal({
              title: "پاسخ با موفقیت ارسال شد",
              icon: "success",
              buttons: "تایید",
            });
          }
        });
      }
    });
  };
  const confirmCommentHandler = (id) => {
    fetch(`http://localhost:4000/v1/comments/accept/${id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${JSON.parse(
          localStorage.getItem("user-token")
        )}`,
      },
    }).then((res) => {
      if (res.ok) {
        swal({
          title: "کامنت تایید شد",
          icon: "success",
          buttons: "تایید",
        }).then(() => {
          setUpdate((prev) => !prev);
        });
      }
    });
  };
  const rejectCommentHandler = (id) => {
    fetch(`http://localhost:4000/v1/comments/reject/${id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${JSON.parse(
          localStorage.getItem("user-token")
        )}`,
      },
    }).then((res) => {
      if (res.ok) {
        swal({
          title: "کامنت رد شد",
          icon: "success",
          buttons: "تایید",
        }).then(() => {
          setUpdate((prev) => !prev);
        });
      }
    });
  };
  const removeCommentHandler = (id) => {
    swal({
      title: "حذف کامنت",
      text: "ایا از حذف این کامنت اطمینان دارید؟",
      icon: "warning",
      buttons: ["خیر", "بله "],
    }).then((confirm) => {
      if (confirm) {
        fetch(`http://localhost:4000/v1/comments/${id}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${JSON.parse(
              localStorage.getItem("user-token")
            )}`,
          },
        }).then((res) => {
          if (res.ok) {
            swal({
              title: "کامنت با موفقیت حذف شد",
              icon: "success",
              buttons: "تایید",
            }).then(() => {
              setUpdate((prev) => !prev);
            });
          }
        });
      }
    });
  };
  const banUserHandler = (id) => {
    swal({
      title: "مسدود کردن کاربر",
      text: "ایا مسدود کردن این کاربر اطمینان دارید؟",
      icon: "error",
      buttons: ["خیر", "بله "],
    }).then((confirm) => {
      if (confirm) {
        fetch(`http://localhost:4000/v1/users/ban/${id}`, {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${JSON.parse(
              localStorage.getItem("user-token")
            )}`,
          },
        }).then((res) => {
          if (res.ok) {
            swal({
              title: "کاربر با موفقیت مسدود شد",
              icon: "success",
              buttons: "تایید",
            }).then(() => {
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
          <DataTable title="لیست کامنت ها">
            <table className="table">
              <thead className="bg-light">
                <tr className="text-center">
                  <th>شناسه</th>
                  <th>کاربر</th>
                  <th>دوره</th>
                  <th>امتیاز</th>
                  <th>مشاهده</th>
                  <th>تایید</th>
                  <th>پاسخ</th>
                  <th>ویرایش</th>
                  <th>حذف</th>
                  <th>بن</th>
                </tr>
              </thead>
              <tbody>
                {allComment.map((comment, index) => {
                  return (
                    <tr key={comment._id} className="text-center">
                      <td>{index + 1}</td>
                      <td>{comment.creator?.name}</td>
                      <td>{comment.course}</td>
                      <td className="ltr">
                        {Array(5)
                          .fill(0)
                          .map((elem, index) => (
                            <img
                              src={
                                index < comment.score
                                  ? "/images/svgs/star_fill.svg"
                                  : "/images/svgs/star.svg"
                              }
                            />
                          ))}
                      </td>
                      <td>
                        <button
                          className="btn btn-secondary"
                          onClick={() => showCommentBodyHandler(comment.body)}
                        >
                          مشاهده
                        </button>
                      </td>
                      <td>
                        {comment.answer == 0 ? (
                          <button
                            className="btn btn-success"
                            onClick={() => confirmCommentHandler(comment._id)}
                          >
                            تایید
                          </button>
                        ) : (
                          <button
                            className="btn btn-danger"
                            onClick={() => rejectCommentHandler(comment._id)}
                          >
                            رد
                          </button>
                        )}
                      </td>
                      <td>
                        <button
                          className="btn btn-primary"
                          onClick={() => answerCommentHandler(comment._id)}
                        >
                          پاسخ
                        </button>
                      </td>
                      <td>
                        <button className="btn btn-secondary">ویرایش</button>
                      </td>
                      <td>
                        <button
                          className="btn btn-danger"
                          onClick={() => removeCommentHandler(comment._id)}
                        >
                          حذف
                        </button>
                      </td>
                      <td>
                        <button
                          className="btn btn-warning"
                          onClick={() => banUserHandler(comment.creator._id)}
                        >
                          بن
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
