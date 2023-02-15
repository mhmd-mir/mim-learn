import React from "react";
import "./AdminIndex.css";

// icons
import { BiRegistered } from "react-icons/bi";
import DataTable from "../../../components/AdminPanel/DataTable/DataTable";
import { useEffect } from "react";
import { useState } from "react";
export default function AdminIndex() {
  const [infos, setInfos] = useState({});

  useEffect(() => {
    fetch("http://localhost:4000/v1/infos/p-admin", {
      headers: {
        Authorization: `Bearer ${JSON.parse(
          localStorage.getItem("user-token")
        )}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setInfos(data));
  }, []);
  return (
    <>
      <div className="container my-3">
        <div className="row">
          <p>
            خوش امدید ، <span className="h5">{infos.adminName}</span>
          </p>
        </div>
      </div>
      {/* // boxes */}
      <div className="container">
        <div className="row">
          {infos.infos?.map((info) => (
            <div className="col-md-4">
              <div className="p-3 rounded shadow d-flex align-items-center justify-content-between">
                <div>
                  <div className="h4">{info.title}</div>
                  <div className="my-1 dsp1">{info.count}</div>
                  <div className="text-muted">{info.title} در یک ماه گذشته</div>
                </div>
                <div>
                  <BiRegistered className="ms-3 adminIndexBoxIcon" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* // chart  */}
      {/* // last registered user */}
      <div className="container my-3">
        <div className="row">
          <DataTable title="لیست افراد اخیرا ثبت نام شده">
            <table className="table">
              <thead className="bg-light">
                <tr>
                  <th>شناسه</th>
                  <th>نام</th>
                  <th>شماره تلفن</th>
                  <th>ایمیل</th>
                </tr>
              </thead>
              <tbody>
                {infos.lastUsers?.map((user, index) => {
                  return (
                    <tr key={user._id}>
                      <td>{index + 1}</td>
                      <td>{user.name}</td>
                      <td>{user.phone}</td>
                      <td>{user.email}</td>
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
