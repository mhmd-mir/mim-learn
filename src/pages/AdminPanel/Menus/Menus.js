import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import swal from "sweetalert";
import DataTable from "../../../components/AdminPanel/DataTable/DataTable";
import AddNewMenu from './../../../components/AdminPanel/AddNewMenu/AddNewMenu'
export default function Menus() {
  const [menus, setMenus] = useState([]);
  const [update, setUpdate] = useState(false);
  useEffect(() => {
    fetch("http://localhost:4000/v1/menus/all")
      .then((res) => res.json())
      .then((menus) => setMenus(menus));
  }, [update]);

  /// handlers
  const removeMenuHandler = (id) => {
    swal({
      title: "حذف منو",
      text: "ایا از حذف این منو اطمینان دارید؟",
      icon: "warning",
      buttons: ["خیر", "بله"],
    }).then((confirm) => {
      if (confirm) {
        fetch(`http://localhost:4000/v1/menus/${id}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${JSON.parse(
              localStorage.getItem("user-token")
            )}`,
          },
        }).then((res) => {
          if (res.ok) {
            swal({
              title: "منو با موفقیت حذف شد",
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
          <AddNewMenu setUpdate={setUpdate} />
        </div>
      </div>
      {/* // show all menus  */}
      <div className="container my-3">
        <div className="row">
          <DataTable title="لیست منوها">
            <table className="table">
              <thead className="bg-light">
                <tr className="text-center">
                  <th>شناسه</th>
                  <th>عنوان</th>
                  <th>لینک</th>
                  <th>ویرایش</th>
                  <th>حذف</th>
                </tr>
              </thead>
              <tbody>
                {menus
                  .filter((menu) => menu.parent == undefined)
                  .map((menu, index) => {
                    return (
                      <tr key={menu._id} className="text-center">
                        <td>{index + 1}</td>
                        <td>{menu.title}</td>
                        <td>{menu.href}</td>
                        <td>
                          <button className="btn btn-primary">ویرایش</button>
                        </td>
                        <td>
                          <button
                            className="btn btn-danger"
                            onClick={() => removeMenuHandler(menu._id)}
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
