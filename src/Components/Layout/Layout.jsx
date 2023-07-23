import React, { useContext } from 'react';
import Navbar from '../Navbar/Navbar';
import Footer from "../Footer/Footer"
import { Outlet, useNavigate } from 'react-router-dom';
import { AuthenticContext } from '../../Context/AutenticationContext';

export default function Layout() {
    const {setUserData}=useContext(AuthenticContext);
    const navigate= useNavigate();
    function LogOut(){
        localStorage.removeItem("userToken");
        setUserData(null);
        navigate("/login");
    }
    return <>
        <Navbar LogOut={LogOut}/> 
        <div className='container-md'>
            <Outlet/>
        </div>
        <Footer/>
    </>
}
