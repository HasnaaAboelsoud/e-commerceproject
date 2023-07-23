import axios from 'axios'
import { useFormik } from 'formik';
import { Helmet } from 'react-helmet';
import { toast } from 'react-hot-toast';

export default function ChangePassword() {
    const token= localStorage.getItem("userToken");

    const formik=useFormik({
        initialValues:{
            currentPassword:"",
            password:"",
            rePassword:""
        },
        onSubmit: changePassword,
    })
    async function changePassword(values){
        try {
            const {data} = await axios.put("https://ecommerce.routemisr.com/api/v1/users/changeMyPassword",values,{
                headers:{
                    token,
                }
            });
            console.log(data);
            if(data.message === "success"){
                toast.success(data.message,{className:"bg-main text-white p-1"});
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message,{className:"bg-danger font-sm text-white"})
        }
    }
    return (
    <div>
        <Helmet>
            <title>Change Password</title>
        </Helmet>
        <div className='mt-5 pt-4'>
            <div className='bg-main-light py-4'>
                <h3 className='fw-bold text-center h5 mb-3'>Change Password</h3>
                <form className='w-75 mx-auto' onSubmit={formik.handleSubmit}>
                    <label htmlFor='currentPassword' className='fw-bold font-sm'>Current Password</label>
                    <input type="password" onChange={formik.handleChange} className='form-control mb-2' name="currentPassword" id="currentPassword"></input>
                
                    <label htmlFor='password' className='fw-bold font-sm'>Password</label>
                    <input type="password" onChange={formik.handleChange} className='form-control mb-2' name="password" id="password"></input>
                
                    <label htmlFor='rePassword' className='fw-bold font-sm'>RePassword</label>
                    <input type="password" onChange={formik.handleChange} className='form-control mb-2' name="rePassword" id="rePassword"></input>
                
                    <button className='btn bg-main text-white mt-3 font-sm py-1'>Change Password</button>
                </form>
            </div>
        </div>
    </div>
    )
}
