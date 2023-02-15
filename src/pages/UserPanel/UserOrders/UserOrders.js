import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import DataTable from "../../../components/AdminPanel/DataTable/DataTable";
import "./UserOrders.css";
export default function UserOrders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/v1/orders", {
      headers: {
        Authorization: `Bearer ${JSON.parse(
          localStorage.getItem("user-token")
        )}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setOrders(data);
      });
  }, []);


  return (
    <div className="p-3">
      <div className="container">
        <div className="row">
          <DataTable title="سفارش ها">
            <table className="table">
              <thead className="bg-light">
                <tr className="text-center">
                  <th>شناسه</th>
                  <th>تاریخ</th>
                  <th>وضعیت</th>
                  <th>دوره</th>
                  <th>مبلغ</th>
                  <th>عملیات</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order, index) => {
                  return (
                    <tr key={order._id} className="text-center">
                      <td>{index + 1}</td>
                      <td>{order.createdAt.slice(0, 10)}</td>
                      <td>تکمیل شده</td>
                      <td>{order.course.name}</td>
                      <td>{order.price?.toLocaleString()}</td>
                      <td>
                        <Link
                          className="btn btn-primary"
                          to={`details/${order._id}`}
                        >
                          نمایش
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </DataTable>
        </div>
      </div>
    </div>
  );
}
