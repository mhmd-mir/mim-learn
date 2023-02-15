import React from 'react'
import './AboutUsBox.css'

export default function AboutUsBox(props) {
  return (
    <div className='d-flex align-items-center ltr p-3 border rounded justify-content-end'>
        <div className='pe-2'>
            <div className="h5 text-end">{props.title}</div>
            <p className='text-muted text-end'>{props.content}</p>
        </div>
        <div className='aboutUsBoxIcon'>
            {props.children}
        </div>
        
    </div>
  )
}
