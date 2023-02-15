import React, { useEffect, useState } from 'react'
import './UserIndex.css'
import { Link } from 'react-router-dom'
export default function UserIndex() {

  const [userInfo , setUserInfo] = useState({})


  useEffect(() => {
    fetch(`http://localhost:4000/v1/auth/me`, {
        headers: {
          Authorization: `Bearer ${JSON.parse(localStorage.getItem('user-token'))}`,
        },
      }).then(res => res.json())
        .then(data => setUserInfo(data))
  } , [])
  return (
    <>
        <div className="p-3">
            <div className='h5 mb-3'>
              سلام محمد <span className='text-theme'>{userInfo.name}</span> ، خوش امدید
            </div>
            <div>
              <p>از طریق پیشخوان حساب کاربری تان، میتوانید سفارش های اخیرتان را مشاهده ، ادرس های حمل و نقل و صورت حسابتان را مدیریت و جزعیات حساب کاربری را ویرایش کنید.</p>
            </div>
            <div>
              <div className="row">
                <div className="col-md-4 my-2">
                  <div className="userDashboardBox">
                    <Link className='flatLink' to="orders">سفارش ها</Link>
                  </div>
                </div>
                <div className="col-md-4 my-2">
                  <div className="userDashboardBox ">
                    <Link className='flatLink' to="courses">دوره های خریداری شده</Link>
                  </div>
                </div>
                <div className="col-md-4 my-2">
                  <div className="userDashboardBox">
                    <Link className='flatLink' to="">کیف پول من</Link>
                  </div>
                </div>
                <div className="col-md-4 my-2">
                  <div className="userDashboardBox">
                    <Link className='flatLink' to="edit-account">جزعیات حساب کاربری</Link>
                  </div>
                </div>
                <div className="col-md-4 my-2">
                  <div className="userDashboardBox">
                    <Link className='flatLink' to="tickets">تیکت های پشتیبانی</Link>
                  </div>
                </div>
              </div>
            </div>
        </div>
    </>
  )
}
