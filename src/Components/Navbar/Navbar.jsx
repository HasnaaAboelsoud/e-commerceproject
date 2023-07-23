import React, { useContext } from 'react';
import logo from "../../finalProject assets/images/freshcart-logo.svg"
import { Link, NavLink } from 'react-router-dom';
import { AuthenticContext } from '../../Context/AutenticationContext';
import { CartContext } from '../../Context/CartContext';
import { SearchContext } from '../../Context/SearchContext';

export default function Navbar({LogOut}) {
    const { userData } = useContext(AuthenticContext);
    const { numOfCartItems,categories } = useContext(CartContext);
    const {SearchProducts,term}= useContext(SearchContext);

    return <>
        <nav className="navbar navbar-expand-lg navbar-light bg-main-light fixed-top mb-5 py-1">
            <div className="container-md">
                <Link className="navbar-brand" to="/">
                    <img src={logo} alt="logo"></img>
                </Link>
                <button className="navbar-toggler d-lg-none" type="button" data-bs-toggle="collapse" data-bs-target="#collapsibleNavId" aria-controls="collapsibleNavId"
                    aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="collapsibleNavId">
                    {userData ? <ul className="navbar-nav fw-bold me-auto mt-2 mt-lg-0 font-sm">
                        <li className="nav-item">
                            <NavLink className="nav-link link" to="/" aria-current="page">Home</NavLink>
                        </li>
                        <div className="dropdown nav-item">
                                <Link className="nav-link border-0 dropdown-toggle" to="" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Categories
                                </Link>
                            <ul className="dropdown-menu border-0 px-2 shadow">
                                {categories.map((category, index) => <li key={index} className="nav-item">
                                    <Link className="nav-link font-sm fw-bold" to={`/categoryproducts/${category._id}`}> {category.name}</Link>
                                </li>
                                )}
                            </ul>
                        </div>
                        <li className="nav-item">
                            <NavLink className="nav-link link" to="/brands">Brands</NavLink>
                        </li>
                        <li>
                            <Link to="/searchproducts" className='w-75'>
                                <input type="text"  onChange={(e) =>SearchProducts(e.target.value)} className='form-control search rounded-2 border-0 py-1 mt-1 ms-0 ms-lg-4' placeholder='search products...'></input>
                            </Link>
                        </li>
                    </ul> : ""}
                    <ul className="navbar-nav fw-bold ms-auto mt-2 mt-lg-0 font-sm">
                        {userData ? <>
                            <div className="dropdown nav-item">
                                <NavLink className="nav-link border-0 dropdown-toggle" to="" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    <i class="fa-regular fa-user me-1"></i> Hi,{`${userData.name}`}
                                </NavLink>

                                <ul className="dropdown-menu border-0 px-2 shadow">
                                    <li className="nav-item">
                                        <NavLink className="nav-link" to="/wishlist"><i class="fa-regular fa-heart me-1"></i> Wishlist</NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink className="nav-link" to="/allorders"><i class="fa-solid fa-box me-1"></i> Orders</NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink className="nav-link font-sm fw-bold" to="/addresses"><i class="fas fa-location-dot"></i> Addresses</NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink className="nav-link" to="/userprofile"><i class="fa-regular fa-user me-1"></i> Profile</NavLink>
                                    </li>
                                    <li className="nav-item text-center">
                                        <NavLink className="nav-link border-top py-1" onClick={LogOut}>LOGOUT</NavLink>
                                    </li>
                                </ul>
                            </div>

                            <li className="nav-item d-flex align-items-center">
                                <NavLink className="nav-link position-relative" to="/cart">Cart <i className="fa-solid fa-cart-shopping mt-1"></i>
                                    {numOfCartItems?<span className='badge d-block rounded px-1 py-1 position-absolute top-0 end-0 bg-main text-white'>{numOfCartItems}</span>:""}
                                </NavLink>
                            </li>
                        </> : <>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/login">Login</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/register">Register</NavLink>
                            </li>
                        </>}
                    </ul>
                </div>
            </div>
        </nav>

    </>
}
