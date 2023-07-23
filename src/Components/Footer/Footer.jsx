import React from 'react'
import style from "./Footer.module.css"
import img1 from "../../finalProject assets/images/payment.png";
import img2 from "../../finalProject assets/images/appstrore.png";


export default function Footer() {
    return (
    <footer className='bg-main-light py-5 mt-4 mb-auto'>
            <div className='container-md'>
                <h3 className='fw-bolder h5'>Get the FreshCart app</h3>
                <p className='text-muted font-sm'>We will send you a link,open it on your phone to download the app</p>
                <div className='row align-items-center ps-md-4 mb-4'>
                    <div className='col-md-9'>
                        <input type="email" placeholder='Email..' className='form-control px-2 py-1'></input>
                    </div>
                    <div className='col-md-3'>
                        <button className='btn bg-main text-white px-3 py-1 font-sm mt-2 mt-lg-0'>Share App Link</button>
                    </div>
                </div>
                <div className='row justify-content-between'>
                    <div className='col-md-4 mb-3'>
                        <h3 className='fw-bold font-sm mb-3 ps-md-4'>Join Us On</h3>
                        <div>
                            <div className="ps-md-4 cursor-pointer">
                                <i className="fa-brands fa-facebook-f me-3 fa-1x"></i>
                                <i className="fa-brands me-3 fa-twitter"></i>
                                <i className="fa-brands me-3 fa-instagram"></i>
                                <i className="fa-brands me-3 fa-youtube"></i>
                            </div>
                        </div>
                    </div>
                    <div className='col-md-4'>
                        <p className='fw-semibold font-sm mb-2'>Payment Methodes</p>
                        <div className='ms-2 mb-3 cursor-pointer'>
                            <i className="fa-brands fa-cc-visa me-3"></i>
                            <i className="fa-brands fa-paypal me-3"></i>
                            <i className="fa-brands fa-cc-mastercard me-3"></i>
                            <i className="fa-brands fa-cc-amazon-pay me-3"></i>
                        </div>
                    </div>
                    <div className='col-md-4'>
                        <p className='fw-semibold font-sm mb-1'>Get deliveries with FreshCart</p>
                        <div className='ms-md-2 mb-3 cursor-pointer'>
                            <img src={img2} className={`${style.images} w-50 mt-0`} alt=""></img>
                        </div>
                    </div>
                </div>
        </div>
    </footer>
    )
}

