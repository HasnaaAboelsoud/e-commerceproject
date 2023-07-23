import axios from 'axios';
import { useFormik } from 'formik';
import React from 'react';
import { Helmet } from 'react-helmet';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import * as Yup from "yup";

export default function ResetPassword() {
    const navigate= useNavigate();
    const validationSchema= Yup.object({
        email: Yup.string().required("Email is required").email("Email is invalid"),
        newPassword: Yup.string().required("new password is required").matches(/^[A-Z][a-z0-9]{5,10}$/,"new password must start with capital letter"),
    })
    const formik= useFormik({
        initialValues:{
            email:"",
            newPassword:"",
        },
        validationSchema,
        onSubmit: ResetPasswordApi, 
    })

    async function ResetPasswordApi(values){
        console.log("jhkladsf");
        try {
            const {data}= await axios.put(`https://ecommerce.routemisr.com/api/v1/auth/resetPassword`,values);
            if(data.token){
                navigate("/login");
            }
        } catch (error) {
            toast.error(error.response.data.message,{className:"bg-danger text-white py-1"});
        }
    }
    return (
    <> 
        <Helmet>
            <title>Reset Password Page</title>
        </Helmet>
        <div className='w-75 mx-auto my-5'>
            <h2 className='h5 fw-bold'>Reset Password :</h2>
            <form onSubmit={formik.handleSubmit}>
                <label htmlFor='email'>Email :</label>
                <input type="email" onChange={formik.handleChange} onBlur={formik.handleBlur} name="email" id="name" className='form-control p-1 mb-2'></input>
                {formik.errors.email && formik.touched.email?<p className='alert alert-danger p-1'>{formik.errors.email}</p>:""}

                <label htmlFor='newPassword'>New Password :</label>
                <input type="password" onChange={formik.handleChange} onBlur={formik.handleBlur} name="newPassword" id="newPassword" className='form-control mb-2 p-1'></input>
                {formik.errors.newpassword && formik.touched.newpassword?<p className='alert alert-danger p-1'>{formik.errors.newpassword}</p>:""}

                <button className='btn bg-main text-white font-sm' type="submit">Reset Password</button>
            </form>
        </div>
    </>
    )
}

