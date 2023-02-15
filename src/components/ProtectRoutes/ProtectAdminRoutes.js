import React from 'react'
import AuthContext from '../../context/authContext'
import { useContext } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
export default function ProtectAdminRoutes(props) {
    const authContext = useContext(AuthContext);
    const navigator = useNavigate()
    console.log(authContext);
  return (
    <>
        {
            authContext.userInfos.role === 'ADMIN' ? <>{props.children}</> : navigator('/login')
        }
    </>
  )
}
