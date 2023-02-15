import React from 'react'
import SectionHeader from '../SectionHeader/SectionHeader'
import AboutUsBox from './../AboutUsBox/AboutUsBox'
import './AboutUs.css'

// importing icons
import {AiOutlineCopyright} from 'react-icons/ai' ;
import {GiPalmTree} from 'react-icons/gi' ;
import {BsGem} from 'react-icons/bs'
import {AiFillCrown} from 'react-icons/ai'


export default function AboutUs() {
  return (
    <>
        <SectionHeader 
            title="ما چه کمکی بهتون میکنیم؟" 
            content="از اونجایی که اکادمی اموزشی میم لرن یک اکادمی اموزشی خصوصی است"
        />
        
        <div className="container ">
            <div className="row ">
                <div className="col-md-6 my-2">
                    <AboutUsBox title="دوره های اختصاصی" content="با پشتیبانی و کیفیت بالا اراعه میده">
                        <AiOutlineCopyright />
                    </AboutUsBox>
                </div>
                <div className="col-md-6 my-2">
                    <AboutUsBox title="اجازه تدریس" content="به هر مدرسی رو نمیده چون کیفیت براش مهمه">
                        <GiPalmTree />
                    </AboutUsBox>
                </div>
                <div className="col-md-6 my-2">
                    <AboutUsBox title="دوره پولی و رایگان" content="براش مهم نیست . به مدرسینش حقوق میده تا نهایت کیفیت رو در پشتیبانی و اپدیت دوره اراعه بده">
                        <BsGem />
                    </AboutUsBox>
                </div>
                <div className="col-md-6 my-2">
                    <AboutUsBox title="اهمیت به کاربر" content="اولویت اول و اخر اکادمی اموزشی میم لرن اهمیت به کاربر ها و رفع نیاز های اموزشی و رسوندن اونا به بازار کار هست">
                        <AiFillCrown />
                    </AboutUsBox>
                </div>
            </div>
        </div>
    </>
  )
}
