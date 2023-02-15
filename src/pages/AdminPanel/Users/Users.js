import React, { useState, useEffect } from "react";
import swal from "sweetalert";
import DataTable from "../../../components/AdminPanel/DataTable/DataTable";
import AddNewUser from "./../../../components/AdminPanel/AddNewUser/AddNewUser";

export default function Users() {
  const [allUsers, setAllUsers] = useState([]);
  const [udpade, setUpdate] = useState(false);
  // useEffect =>
  useEffect(() => {
    fetch("http://localhost:4000/v1/users", {
      headers: {
        Authorization: `Bearer ${JSON.parse(
          localStorage.getItem("user-token")
        )}`,
      },
    })
      .then((res) => res.json())
      .then((allUsers) => {
        setAllUsers(allUsers);
      });
  }, [udpade]);

  // handlers =>
  // remove user
  const removeUserHandler = (id) => {
    swal({
      title: "حذف کاربر از سایت",
      text: "ایا از حذف کاربر اطمینان دارید؟",
      icon: "warning",
      buttons: ["خیر", "بله"],
    }).then((confirm) => {
      if (confirm) {
        // remove user logic
        fetch(`http://localhost:4000/v1/users/${id}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${JSON.parse(
              localStorage.getItem("user-token")
            )}`,
          },
        }).then((res) => {
          if (res.ok) {
            swal({
              title: "کاربر با موفقیت حذف شد",
              icon: "success",
              button: "تایید",
            }).then((confirm) => {
              // update dom...
              setUpdate((prev) => !prev);
            });
          }
        });
      }
    });
  };
  // ban user
  const banUserHandler = (id) => {
    swal({
      title: "مسدود کردن کاربر",
      text: "ایا مطمعن هستید؟",
      icon: "warning",
      buttons: ["خیر", "بله"],
    }).then((confirm) => {
      // ban user logic
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
            });
          }
        });
      }
    });
  };

  const changeUserRoleHandler = (id) => {
    swal({
      title: "نقش مورد نظر را وارد کنید",
      content: "input",
      buttons: "تغییر سطح دسترسی",
    }).then((role) => {
      if (role) {
        const newRoleInfo = {
          role,
          id
        };
        fetch("http://localhost:4000/v1/users/role", {
          method: "PUT",
          headers: {
            "Content-type": "Application/json",
            Authorization: `Bearer ${JSON.parse(
              localStorage.getItem("user-token")
            )}`,
          },
          body: JSON.stringify(newRoleInfo),
        }).then(res => {
          if(res.ok){
            swal({
              title : 'تغییر سطح دسترسی کاربر با موفقیت انجام شد' , 
              icon : 'success' , 
              buttons : 'تایید'
            }).then(() => {
              // update dom
              setUpdate(prev => !prev);
            })
          }
        })
      }
    });
  };
  return (
    <>
      {/* // add new user */}
      <div className="container">
        <div className="row">
          <AddNewUser setUpdate={setUpdate} />
        </div>
      </div>
      {/* // show users */}
      <div className="container my-4">
        <div className="row">
          <DataTable title="لیست کاربران">
            <table className="table">
              <thead className="bg-light">
                <tr>
                  <th>شناسه</th>
                  <th>نام و نام خانوادگی</th>
                  <th>شماره</th>
                  <th className="text-center">ایمیل</th>
                  <th className="text-center">سطح دسترسی</th>
                  <th>ویرایش</th>
                  <th>تغییر سطح</th>
                  <th>حذف</th>
                  <th>مسدود</th>
                </tr>
              </thead>
              <tbody>
                {allUsers.map((user, index) => {
                  return (
                    <tr key={user._id}>
                      <td>{index + 1}</td>
                      <td>{user.name}</td>
                      <td>{user.phone}</td>
                      <td className="text-center">{user.email}</td>
                      <td className="text-center">
                        {user.role === "ADMIN" ? "مدیر" : "کاربر"}
                      </td>
                      <td>
                        <button className="btn btn-primary">ویرایش</button>
                      </td>
                      <td>
                        <button
                          className="btn btn-warning"
                          onClick={() => changeUserRoleHandler(user._id)}
                        >
                          تغییر سطح
                        </button>
                      </td>
                      <td>
                        <button
                          className="btn btn-danger"
                          onClick={() => removeUserHandler(user._id)}
                        >
                          حذف
                        </button>
                      </td>
                      <td>
                        <button
                          className="btn btn-secondary"
                          onClick={() => banUserHandler(user._id)}
                        >
                          مسدود
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
