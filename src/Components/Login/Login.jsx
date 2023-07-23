import React, { useContext, useState } from 'react';
import { useFormik } from 'formik';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import * as Yup from "yup"
import { toast } from 'react-hot-toast';
import { AuthenticContext } from '../../Context/AutenticationContext';
import { Helmet } from 'react-helmet';

export default function Login() {
    const navigate= useNavigate();
    const [error,seterror]= useState("");
    const [loading,setloading]=useState(false);
    const {saveData}=useContext(AuthenticContext);

    const validationSchema= Yup.object({
        email: Yup.string().required("Email is required").email("Email is invalid"),
        password: Yup.string().required("Password is required").matches(/^[A-Z][a-z0-9]{5,10}$/,"password must start with capital letter"),
    })
    const formik=useFormik({
        initialValues:{
            email:"",
            password:"",
        },
        validationSchema,
        onSubmit: SubmitLogin,
    });
    async function SubmitLogin(values){
        try {
            setloading(true);
            const {data}= await axios.post("https://ecommerce.routemisr.com/api/v1/auth/signin",values);
            if(data.message === "success"){
                localStorage.setItem("userToken",data.token);
                saveData();
                setloading(false);
                toast.success(data.message,{className:"bg-main text-white py-1 font-sm"});
                navigate("/");
                seterror("");
            }
        } catch (error) {
            setloading(false);
            seterror(error.response.data.message);
        }
        
    }
    return <>
        <Helmet>
            <title>Login Page</title>
        </Helmet>
        <div className="px-lg-5 mx-auto py-5 mt-5 d-flex justify-content-center align-items-center">
            <div className='shadow-lg w-75 p-4'>
                <form onSubmit={formik.handleSubmit}>
                    <h2 className='h4 text-center mb-3'>Welcome back !</h2>
                    <h3 className='h5 fw-bolder mb-3'>Sign in to your account :</h3>
                    {error ? <p className='alert alert-danger p-1'>{error}</p> : ""}
                    <label htmlFor='email'>Email:</label>
                    <input type="email" onChange={formik.handleChange} onBlur={formik.handleBlur} name="email" id="name" className='form-control p-1 mb-2'></input>
                    {formik.errors.email && formik.touched.email ? <p className='alert alert-danger p-1'>{formik.errors.email}</p> : ""}

                    <label htmlFor='password'>Password</label>
                    <input type="password" onChange={formik.handleChange} onBlur={formik.handleBlur} name="password" id="password" className='form-control mb-2 p-1'></input>
                    {formik.errors.password && formik.touched.password ? <p className='alert alert-danger p-1'>{formik.errors.password}</p> : ""}

                    <p className='font-sm text-muted mb-1 text-center'>Don't have an account? <Link to="/register" className='text-primary'>SignUp</Link></p>
                    <Link to="/forgetpassword" className='text-primary text-center d-block mb-3 font-sm'>Forget your password?</Link>
                    {loading ? <button className='btn bg-main w-100'><i className='fas fa-spinner fa-spin text-white'></i></button> : <button disabled={!(formik.isValid && formik.dirty)} className='btn bg-main text-white w-100' type="submit">Login</button>}
                </form>
            </div>
        </div>
    </>
}
