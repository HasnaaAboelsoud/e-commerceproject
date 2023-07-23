import React, {  useEffect, useState } from 'react'
import { useFormik } from 'formik';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import Loading from '../Loading/Loading';
import { Helmet } from 'react-helmet';

export default function Profile() {
    const token =localStorage.getItem("userToken");
    const [username,setusername]= useState("");
    const [email,setemail]= useState("");
    const [loading,setloading] =useState(false);

    const formik= useFormik({
        initialValues:{
            name: "",
            email: "",
            phone: "01065674517",
        },onSubmit: updateData
    });
    async function updateData(values){
        try {
            setloading(true);
            const {data}= await axios.put("https://ecommerce.routemisr.com/api/v1/users/updateMe/",values,{
                headers:{
                    token,
                }
            });
            console.log(data);
            if(data.message === "success"){
                setusername(data.user.name);
                setemail(data.user.email);
                toast.success(data.message,{className:"bg-main text-white p-1"});
                setloading(false);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.errors.msg,{className:"bg-danger font-sm text-white"})
            setloading(false);
        }
    }
    useEffect(()=>{
        updateData();
    },[])

    return (<>
        <Helmet>
            <title>Profile</title>
        </Helmet>
        {!loading ? <div className='my-5 pt-4'>
            <div className='bg-main-light p-4'>
                <h3 className='fw-bold h5 mt-2'>Profile</h3>
                <p className='text-muted font-sm2'>Manage your details, view your tier status</p>
                <div className='my-4 p-4 shadoe-lg bg-white mx-auto'>
                    <form onSubmit={formik.handleSubmit}>
                        <h4 className='h5 mb-3 fw-bold text-center'>Personal Info</h4>
                        <div className='row mb-2'>
                            <div className='col-sm-6'>
                                <label htmlFor='name' className='font-sm fw-bold'>Your Name :</label>
                                <input type="text" onChange={(e) => setusername(e.target.value ? e.target.value : username)} value={username} className='form-control py-1' name="name" id="name"></input>
                            </div>
                            <div className='col-md-6'>
                                <label htmlFor='phone' className='font-sm fw-bold'>Your Phone :</label>
                                <input type="tel" onChange={formik.handleChange} value={formik.values.phone}  className='form-control py-1' name="phone" id="phone"></input>
                            </div>
                        </div>
                        <label htmlFor='email' className='font-sm fw-bold'>Your Email :</label>
                        <input type="email" value={email} onChange={(e) => setemail(e.target.value ? e.target.value : email)} className='form-control py-1' name="email" id="email"></input>
                        <button className='btn bg-main text-white mt-3 font-sm' disabled={!formik.dirty}>UPDATE INFO</button>
                    </form>
                </div>
            </div>
        </div> : <Loading />}
        </>
    )
}
