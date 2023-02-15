import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import AddNewCategory from "../../../components/AddNewCategory/AddNewCategory";
import DataTable from "../../../components/AdminPanel/DataTable/DataTable";
import "./AdminCategories.css";
import swal from "sweetalert";
export default function AdminCategories() {
  const [allCategories, setAllCategories] = useState([]);
  const [update, setUpdate] = useState(false);
  // useEffect
  useEffect(() => {
    fetch("http://localhost:4000/v1/category")
      .then((res) => res.json())
      .then((allCategories) => {
        setAllCategories(allCategories);
      });
  }, [update]);

  // handler
  const removeCategoryHandler = (id) => {
    swal({
      title: "حذف دسته بندی",
      icon: "warning",
      buttons: ["خیر", "بله"],
      text: "ایا از حذف دسته بندی اطمینان دارید؟>",
    }).then((confirm) => {
      if (confirm) {
        // removing
        fetch(`http://localhost:4000/v1/category/${id}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${JSON.parse(
              localStorage.getItem("user-token")
            )}`,
          },
        }).then((res) => {
          if (res.ok) {
            swal({
              title: "دسته بندی با موفقیت حذف شد",
              icon: "success",
              buttons: "تایید",
            }).then((confirm) => {
              // update
              setUpdate((prev) => !prev);
            });
          }
        });
      }
    });
  };
  const updateCategory = (id) => {
    swal({
      title: "ویرایش دسته بندی",
      text: "عنوان جدید برای این دسته بندی را وارد کنید",
      icon: "info",
      content: "input",
      buttons: "ثبت عنوان جدید",
    }).then((newTitle) => {
      const newTitleObj = { title : newTitle };
      console.log(newTitleObj);
      if (newTitle.trim().length) {
        fetch(`http://localhost:4000/v1/category/${id}`, {
          method: "PUT",
          headers: {
            "Content-type": "application/json",
            "Authorization" : `Bearer ${JSON.parse(
              localStorage.getItem("user-token")
            )}`,
          },
          body: JSON.stringify(newTitleObj)
        }).then((res) => {
            console.log(res);
          if (res.ok) {
            swal({
              title: "ویرایش با موفقیت انجام شد",
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
      {/* // add new category section */}
      <div className="container my-3">
        <div className="row">
          <AddNewCategory setUpdate={setUpdate} />
        </div>
      </div>
      {/* // show all categories */}
      <div className="container my-4 rtl">
        <div className="row">
          <DataTable title="لیست دسته بندی ها">
            <table className="table">
              <thead className="bg-light">
                <tr className="text-center">
                  <th>شناسه</th>
                  <th>عنوان</th>
                  <th>ویرایش</th>
                  <th>حذف</th>
                </tr>
              </thead>
              <tbody>
                {allCategories.map((category, index) => {
                  return (
                    <tr key={category._id} className="text-center">
                      <td>{index + 1}</td>
                      <td>{category.title}</td>
                      <td>
                        <button
                          className="btn btn-primary"
                          onClick={() => updateCategory(category._id)}
                        >
                          ویرایش
                        </button>
                      </td>
                      <td>
                        <button
                          className="btn btn-danger"
                          onClick={() => removeCategoryHandler(category._id)}
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
