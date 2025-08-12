import React from "react";
import { Navigate } from "react-router-dom";
import { getRefreshToken } from "./jwt.helper";

const Protected=({children,needLoggedIn})=>{
    if(needLoggedIn){
        if(!getRefreshToken()) return <Navigate to={`/login`}/>
        return <>{children}</>
    }
    
    return <>{children}</>
}

export default Protected