import React from 'react'
import './UserPanel.css'
import Topbar from '../../../components/Topbar/Topbar'
import Footer from '../../../components/Footer/Footer'
import Navbar from '../../../components/Navbar/Navbar'
import { Link, Outlet } from 'react-router-dom'
import Sidebar from '../../../components/UserPanel/Sidebar/Sidebar'
export default function UserPanel() {
  return (
    <>
        <Topbar />
        <Navbar />

        {/* // static header section */}
        <div className='py-3 my-3 spBorder'>
            <div className="container rtl">
                <div className="row">
                    <div>
                        <p className="h4">حساب کاربری من</p>
                        <span className='text-muted'>پیشخوان</span>
                    </div>
                </div>
            </div>
        </div>


        {/* // main content => */}
        <div className="container rtl my-3">
            <div className="row">
                <div className="col-lg-4 ">
                    <Sidebar />
                </div>
                <div className="col-lg-8">
                    <Outlet />
                </div>
            </div>
        </div>


        <Footer />
    </>
  )
}
