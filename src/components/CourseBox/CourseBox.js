import React from 'react'

import './CourseBox.css'

// importing icons
import {FaChalkboardTeacher} from 'react-icons/fa' ;
import {AiFillStar} from 'react-icons/ai' ;
import {FaUserAlt} from 'react-icons/fa' ;
import {AiOutlineArrowLeft} from 'react-icons/ai'
import { Link } from 'react-router-dom';


export default function CourseBox(props) {
  return (
    <>
        <div className="courseBox rtl shadow rounded m-3 m-sm-1">
            <div className="courseImg">
                <img src="/images/courses/jango.png" alt="jango" className='img-fluid customRounded w-100' />
            </div>
            <div className='my-3 px-2'>
                <Link to={`/course-info/${props.shortName}`} className="flatLink h6" >
                <p >{props.name}</p>
                </Link>
            </div>
            <div className="d-flex justify-content-between px-2 my-1">
                <div>
                    <FaChalkboardTeacher />
                    <span>رضا دولتی</span>
                </div>
                <div className='ltr'>
                    {
                        Array(5).fill(0).map((zero , index ) => (
                            <AiFillStar className={`${props.courseAverageScore > index ? "fillStar" : null}`} />
                        ))
                    }
                    
                    {/* <AiFillStar className='fillStar' />
                    <AiFillStar className='fillStar' />
                    <AiFillStar className='fillStar' />
                    <AiFillStar /> */}
                </div>
            </div>
            <div className='d-flex justify-content-between px-2 my-1'>
                <div>
                    <FaUserAlt />
                    <span>500</span>
                </div>
                <div>
                    <p>
                        {props.price ? props.price.toLocaleString() : 'رایگان' }
                    </p>
                </div>
            </div>
            <div className='px-3'>
                <hr />
            </div>
            <div className='moreInfoBtn pb-3'>
                <Link to={`/course-info/${props.shortName}`} className="flatLink h6">مشاهده اطلاعات</Link>
                <AiOutlineArrowLeft />
            </div>
        </div>
    </>
  )
}
