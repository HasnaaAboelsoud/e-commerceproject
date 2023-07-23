import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from "yup"
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { Helmet } from 'react-helmet';

export default function Register() {
    const [loading,setloading] = useState(false);
    const [error,seterror] = useState("");
    const navigate=useNavigate();
    const validationSchema= Yup.object({
        name: Yup.string().required("Name is required").min(3,"minimum characters are 3 ").max(10,"maximum character is 20"),
        email: Yup.string().required("Email is required").email("Email is invalid"),
        password: Yup.string().required("password is required").matches(/^[A-Z][a-z0-9]{5,10}$/,"Password should start with capital letter"),
        rePassword:Yup.string().required("Repassword is required").oneOf([Yup.ref("password")],"Repassword not match password"),
        phone:Yup.string().required("phone is required").matches(/^(02)?(01)[0-25][0-9]{8}$/,"Number is invalid"),
    })
    const formik=useFormik({
        initialValues:{
            name: "",
            email:"",
            password:"",
            rePasword:"",
            phone:"",
        },
        validationSchema,
        onSubmit: submitRegister,
    })
    async function submitRegister(values){
        try {
            setloading(true);
            const {data}= await axios.post("https://ecommerce.routemisr.com/api/v1/auth/signup",values);
            console.log(data);
            if(data.message === "success"){
                setloading(false);
                toast.success(data.message,{className:"bg-main text-white py-1 font-sm"});
                navigate("/login");
                seterror("");
            }
        } catch (error) {
            setloading(false);
            seterror(error.response.data.message);
        }
    }
    return <>
        <Helmet>
            <title>Register Page</title>
        </Helmet>
        <div className="px-lg-5 mx-auto py-5 mt-5 d-flex justify-content-center align-items-center">
            <div className='w-75 shadow-lg p-4'>
                <form onSubmit={formik.handleSubmit}>
                    <h2 className='h5 fw-bold mb-3'>Creact an account : </h2>
                    {error ? <p className='alert alert-danger p-1'>{error}</p> : ""}
                    <label htmlFor='name'>Name: </label>
                    <input type="text" onChange={formik.handleChange} onBlur={formik.handleBlur} name="name" id="name" className='form-control mb-2 p-1'></input>
                    {formik.errors.name && formik.touched.name ? <p className='alert alert-danger p-1'>{formik.errors.name}</p> : ""}

                    <label htmlFor='email'>Email: </label>
                    <input type="email" onChange={formik.handleChange} onBlur={formik.handleBlur} name="email" id="email" className='form-control mb-2 p-1'></input>
                    {formik.errors.email && formik.touched.email ? <p className='alert alert-danger p-1'>{formik.errors.email}</p> : ""}

                    <label htmlFor='password'>Password: </label>
                    <input type="password" onChange={formik.handleChange} onBlur={formik.handleBlur} name="password" id="password" className='form-control mb-2 p-1'></input>
                    {formik.errors.password && formik.touched.password ? <p className='alert alert-danger p-1'>{formik.errors.password}</p> : ""}

                    <label htmlFor='repassword'>RePassword: </label>
                    <input type="password" onChange={formik.handleChange} onBlur={formik.handleBlur} name="rePassword" id="rePassword" className='form-control mb-2 p-1'></input>
                    {formik.errors.rePassword && formik.touched.rePassword ? <p className='alert alert-danger p-1'>{formik.errors.rePassword}</p> : ""}

                    <label htmlFor='phone'>phone: </label>
                    <input type="tel" onChange={formik.handleChange} onBlur={formik.handleBlur} name="phone" id="phone" className='form-control mb-2 p-1'></input>
                    {formik.errors.phone && formik.touched.phone ? <p className='alert alert-danger p-1'>{formik.errors.phone}</p> : ""}

                    <p className='font-sm text-muted text-center'>Already have an account? <Link to="/login" className='text-primary font-sm'>Sign In</Link></p>
                    {loading ? <button className='btn bg-main text-white w-100' type="button"><i className="fas fa-spinner fa-spin"></i></button>
                        : <button disabled={!(formik.isValid && formik.dirty)} className='btn bg-main text-white w-100' type="submit">Register</button>}
                </form>
            </div>
        </div>
    </>
}
