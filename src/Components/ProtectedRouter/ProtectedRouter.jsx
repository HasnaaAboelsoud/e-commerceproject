import React from 'react';
import { Navigate } from 'react-router-dom';
export default function ProtectedRouter({children}) {
    if(localStorage.getItem("userToken") === null){
        return <Navigate to="/login"></Navigate>
    }
    else{
        return children;
    }
}
