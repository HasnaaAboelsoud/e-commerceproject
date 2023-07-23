import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { AddressesContext } from '../../Context/AddressesContext'
import { toast } from 'react-hot-toast';
import Loading from '../Loading/Loading';
import {Helmet} from "react-helmet";
import axios from 'axios';

export default function Addresses() {
    const {Deleteaddress}= useContext(AddressesContext);
    const [userAddresses,setUserAddresses]= useState([]);
    const token= localStorage.getItem("userToken");
    console.log(userAddresses);

    async function getLoggedUserAddressFun(){
        try {
            const {data}=await axios.get("https://ecommerce.routemisr.com/api/v1/addresses",{
                headers:{
                    token,
                }
            })
            if(data?.data?.status === "success"){
                setUserAddresses(data.data.data);
            }
        } catch (error) {
            toast.error("Error",{className:"bg-danger text-white"});
        }
    }

    useEffect(()=>{
        getLoggedUserAddressFun();
    },[])

    async function removeAddress(id){
        try {
            const data= await Deleteaddress(id);
            if(data.data.status === "success"){
                console.log(data);
                setUserAddresses(data.data.data);
                toast.success(data.data.message,{className:"bg-main text-white font-sm"});
            }
        } catch (error) {
            console.log(error);
            toast.error("Address not removed",{className:"bg-danger text-white font-sm"});
        }
    }
    return (
        <>
            <Helmet>
                <title>Addresses</title>
            </Helmet>
            <div className='mt-5 pt-4'>
                <div className='bg-main-light p-4 pb-5'>
                    <h3 className='fw-bold h5'>Addresses</h3>
                    <p className='text-muted font-sm'>Manage your saved addresses for fast and easy checkout across our marketplaces</p>
                    <Link to="/addressform" className='btn bg-main font-sm text-white py-1'>Add New Address</Link>
                    {userAddresses.length > 0?<>
                        <div className='row g-2 mt-4'>
                            {userAddresses? userAddresses.map((useraddress,index)=><div className='col-4' key={index}>
                                <div className='border border-2 shadow p-3 position-relative'>
                                    <h6 className='fw-bold font-sm'>{useraddress.name}</h6>
                                    <h6 className='font-sm'>{useraddress.details}</h6>
                                    <h6 className='font-sm'>{useraddress.city}</h6>
                                    <h6 className='font-sm'>+20 {useraddress.phone}</h6>
                                    <div className=' pb-3 cursor-pointer'>
                                        <button className='btn position-absolute end-0 px-3 font-sm text-main' onClick={()=>removeAddress(useraddress._id)}><i className='fa-regular fa-1x fa-trash-can me-1'></i>Delete</button>
                                    </div>
                                </div>
                            </div>
                            
                            ):<Loading/>}
                        </div>
                    </>:""}
                
                </div>
            </div>
        </>
    )
}
