import React, { useContext } from 'react'
import { Link, Outlet, useNavigate } from 'react-router-dom'
import { AuthenticContext } from '../../Context/AutenticationContext'
import { Helmet } from 'react-helmet';

export default function UserProfile() {
    const {userData,setUserData}= useContext(AuthenticContext);
    const navigate= useNavigate();
    function LogOut(){
        localStorage.removeItem("userToken");
        setUserData(null);
        navigate("/login");
    }
    return (
    <div>
        <Helmet>
            <title>User Profile</title>
        </Helmet>
        <div className='row'>
                <div className='col-4 col-lg-3 mt-5 pt-4 sidebar v-1000'>
                    <div className='bg-main-light px-3 py-4 px-lg-4'>
                        <h2 className='h6 fw-bold pb-3 mt-2 border-bottom'>HI,{userData?.name?.toUpperCase()} !</h2>
                        <ul className='navbar-nav mt-3'>
                            <li className="nav-item mb-2">
                                <Link className="nav-link font-sm fw-bold" to="wishlist"><i class="fa-regular fa-heart"></i> Wishlist</Link>
                            </li>
                            <li className="nav-item mb-2">
                                <Link className="nav-link font-sm fw-bold" to="orders"><i class="fa-solid fa-box"></i> Orders</Link>
                            </li>
                            <li className="nav-item mb-2">
                                <Link className="nav-link font-sm fw-bold" to="addresses"><i class="fas fa-location-dot"></i> Address</Link>
                            </li>
                            <li className="nav-item mb-2 font-sm fw-bold">
                                <Link className="nav-link" to="/userprofile"><i class="fa-regular fa-user"></i> Profile</Link>
                            </li>
                            <li className="nav-item mb-2 font-sm fw-bold">
                                <Link className="nav-link" to="changepassword"><i class="fa-regular fa-eye"></i> Change Password</Link>
                            </li>
                            <li className="nav-item mt-3">
                                <Link className="nav-link border-top pt-3 fw-bold font-sm" onClick={LogOut}>LOGOUT</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            <div className='col-8 col-lg-9 mb-4'>
                <Outlet/>
            </div>
        </div>
    </div>
    )
}
