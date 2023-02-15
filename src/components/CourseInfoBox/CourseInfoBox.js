import React from 'react'
import './CourseInfoBox.css'
export default function CourseInfoBox(props) {
  return (
    <div className='p-3 d-flex align-items-center rtl shadow mx-2 my-3'>
        <div className='courseInfoBoxIcon mx-2'>
            {props.icon}
        </div>
        <div>
            <div className='h5 m-0'>{props.title} :</div>
            <div >{props.content}</div>
        </div>
    </div>
  )
}
