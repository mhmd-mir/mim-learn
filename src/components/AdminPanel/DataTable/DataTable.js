import React from 'react';
import './DataTable.css';
export default function DataTable(props) {
  return (
    <>
        <div className='tableParent'>
            <div className='tableTitle my-3'>
                <span className='h5'>{props.title}</span>
            </div>
            <div className='table-responsive'>
                {
                    props.children
                }
            </div>
        </div>
    </>
  )
}
