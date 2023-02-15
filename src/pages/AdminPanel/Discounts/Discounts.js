import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import swal from "sweetalert";
import DataTable from "../../../components/AdminPanel/DataTable/DataTable";
import AddNewDiscount from "../../../components/AdminPanel/AddNewDiscount/AddNewDiscount";
export default function Discounts() {
  const [allDiscount, setAllDiscount] = useState([]);
  const [update , setUpdate] = useState(false);
  // useEffect =>
  useEffect(() => {
    fetch("http://localhost:4000/v1/offs/")
      .then((res) => res.json())
      .then((data) => setAllDiscount(data));
  }, [update]);

  // handler =>
  const removeDiscountHandler = (id) => {
    swal({
      title: "حذف کد تخفیف",
      text: "ایا از حذف این کوپن اطمینان دارید؟",
      icon: "warning",
      buttons: ["خیر", "بله"],
    }).then((confirm) => {
      if (confirm) {
        fetch(`http://localhost:4000/v1/offs/${id}`, {
          method: "DELETE",
          headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${JSON.parse(
              localStorage.getItem("user-token")
            )}`,
          },
        }).then(res => {
            if(res.ok){
                swal({
                    title : 'حذف کوپن با موفقیت انجام شد' , 
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
        {/* // add new copen  */}
        <div className="container my-3">
            <div className="row">
                <AddNewDiscount setUpdate={setUpdate}/>
            </div>
        </div>
      <div className="container my-3">
        <div className="row">
          <DataTable title="لیست کوپن ها">
            <table className="table">
              <thead className="bg-light">
                <tr>
                  <th>شناسه</th>
                  <th>کد</th>
                  <th>درصد</th>
                  <th>حداکثر استفاده</th>
                  <th>دفعات استفاده</th>
                  <th>سازنده</th>
                  <th>حذف</th>
                </tr>
              </thead>
              <tbody>
                {allDiscount.map((discount, index) => {
                  return (
                    <tr key={discount._id}>
                      <td>{index + 1}</td>
                      <td>{discount.code}</td>
                      <td>{discount.percent}</td>
                      <td>{discount.max}</td>
                      <td>{discount.uses}</td>
                      <td>{discount.creator}</td>
                      <td>
                        <button
                          className="btn btn-danger"
                          onClick={() => removeDiscountHandler(discount._id)}
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
