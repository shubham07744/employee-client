import React from 'react'
import { UseAuth } from '../context/authContext'
import { Navigate } from 'react-router-dom'

const RoleBasedRoutes = ({children, requiredRole}) => {
    const {user, loading} = UseAuth()

    if(loading){
       return <div>Loading...</div>
    }

    if(!requiredRole.includes(user.role)){
       return <Navigate to="unauthorized" />
    }

    return user ? children : <Navigate to="/login" />

}

export default RoleBasedRoutes