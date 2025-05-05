import { Navigate } from "react-router-dom"
import { UseAuth } from "../context/authContext"


const PrivateRoutes = ({children}) => {
    const {user, loading} = UseAuth()

    if(loading){
       return <div>Loading...</div>
    }

    return user ? children : <Navigate to='/login' />
}


export default PrivateRoutes