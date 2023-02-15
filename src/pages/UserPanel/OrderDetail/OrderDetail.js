import React, { useState } from "react";
import "./OrderDetail.css";

import { useParams } from "react-router-dom";
import { useEffect } from "react";
export default function OrderDetail() {
  const params = useParams();
  const [orderDetail  , setOrderDetail] = useState({})

  useEffect(() => {
    fetch(`http://localhost:4000/v1/orders/${params.id}`, {
      headers: {
        Authorization: `Bearer ${JSON.parse(
          localStorage.getItem("user-token")
        )}`,
      },
    }).then(res => res.json())
        .then(data => {
            setOrderDetail(data[0])
        })
  }, []);
  return (
    <>
      <div className="p-3">
        <div>
          <p>
            سفارش {orderDetail._id?.slice(0,4)} در تاریخ {orderDetail.createdAt?.slice(0,10)} ثبت شده است و درحال حاضر در وضعیت تکمیل
            شده میباشد.
          </p>
        </div>
        <div>
          <div className="h3">مشخصات سفارش</div>
        </div>
        <div>
          <div className="d-flex justify-content-between border-bottom">
            <div>محصول</div>
            <div>{orderDetail.course?.name}</div>
          </div>
          <div className="d-flex justify-content-between border-bottom">
            <div>قیمت</div>
            <div>{orderDetail.price?.toLocaleString()}</div>
          </div>
          <div className="d-flex justify-content-between border-bottom">
            <div>تاریخ</div>
            <div>{orderDetail.createdAt?.slice(0,10)}</div>
          </div>
        </div>
        <div className="my-3">
          <button className="bg-theme-dark fill-theme-btn">سفارش دوباره</button>
        </div>
      </div>
    </>
  );
}
