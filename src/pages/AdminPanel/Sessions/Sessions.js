import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import DataTable from "../../../components/AdminPanel/DataTable/DataTable";
// swal
import swal from "sweetalert";
import AddNewSession from "../../../components/AdminPanel/AddNewSession/AddNewSession";
export default function Sessions() {
  const [allSessions, setAllSessions] = useState([]);
  const [update, setUpdate] = useState(false);
  useEffect(() => {
    fetch("http://localhost:4000/v1/courses/sessions")
      .then((res) => res.json())
      .then((allSessions) => {
        setAllSessions(allSessions);
      });
  }, [update]);

  // handlers =>
  const removeSessionHandler = (id) => {
    swal({
      title: "حذف جلسه",
      text: "ایا از حذف این جلسه اطمینان دارید؟",
      icon: "warning",
      buttons: ["خیر", "بله"],
    }).then((confirm) => {
      if (confirm) {
        fetch(`http://localhost:4000/v1/courses/sessions/${id}`, {
          method: "DELETE",
          headers: {
            'Authorization': `Bearer ${JSON.parse(
              localStorage.getItem("user-token")
            )}`,
          },
        }).then((res) => {
          if (res.ok) {
            swal({
              title: "حذف جلسه با موفقیت انجام شد",
              icon: "success",
              buttons: "باشه",
            }).then((res) => {
              // update
              setUpdate((prev) => !prev);
            });
          }
        });
      }
    });
  };
  return (
    <>
    {/* // add new sessions */}
    <div className="container my-3">
        <div className="row">
            <AddNewSession setUpdate={setUpdate}/>
        </div>
    </div>
    {/* // show all sessions */}
      <div className="container my-3">
        <div className="row">
          <DataTable title="لیست جلسات دوره ها">
            <table className="table">
              <thead className="bg-light">
                <tr className="text-center">
                  <th>شناسه</th>
                  <th>عنوان</th>
                  <th>زمان</th>
                  <th>دوره</th>
                  <th>حذف</th>
                </tr>
              </thead>
              <tbody>
                {allSessions.map((session, index) => {
                  return (
                    <tr key={session._id} className="text-center">
                      <td>{index + 1}</td>
                      <td>{session.title}</td>
                      <td>{session.time}</td>
                      <td>{session.course?.name}</td>
                      <td>
                        <button
                          className="btn btn-danger"
                          onClick={() => removeSessionHandler(session._id)}
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
