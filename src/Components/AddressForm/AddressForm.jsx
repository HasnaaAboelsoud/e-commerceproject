import React, { useContext } from 'react'
import { AddressesContext } from '../../Context/AddressesContext'
import { useFormik } from 'formik';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import {Helmet} from "react-helmet";

export default function AddressForm() {
    const {AddAddresses}= useContext(AddressesContext);
    const navigate= useNavigate();

    const formik= useFormik({
        initialValues:{
            name:"",
            details:"",
            phone:"",
            city:"",
        },
        onSubmit: AddAddressesFun,
    })
    async function AddAddressesFun(values){
        try {
            const data= await AddAddresses(values);
            if(data?.data?.status === "success"){
                toast.success(data.data.message,{className:"bg-main text-white p-1 font-sm"});
                navigate("/addresses");
            }
        } catch (error) {
            toast.error("Address not Added",{className:"bg-danger font-sm text-white"});
            console.log(error);
        }
    }
    return (
    <div> 
        <Helmet>
                <title>create Address</title>
            </Helmet>
        <div className='mt-5 p-4 w-75 mx-auto'>
            <h3 className='h5 fw-bold mt-3'>Add a New Address</h3>
            <form onSubmit={formik.handleSubmit}>
                <label htmlFor='name'>Name :</label>
                <input type="text" value={formik.values.name} onChange={formik.handleChange} className='form-control py-1 mb-2' name="name" id="name"></input>
            
                <label htmlFor='details'>Details :</label>
                <input type="text" value={formik.values.details} onChange={formik.handleChange} className='form-control py-1 mb-2' name="details" id="details"></input>
            
                <label htmlFor='phone'>Phone :</label>
                <input type="tel" value={formik.values.phone} onChange={formik.handleChange} className='form-control py-1 mb-2' name="phone" id="phone"></input>

                <label htmlFor='city'>City :</label>
                <input type="text" value={formik.values.city} onChange={formik.handleChange} className='form-control py-1 mb-2' name="city" id="city"></input>
            
                <button className='btn bg-main btn-lg text-white mt-3' disabled={!formik.dirty} type="submit">Save</button>
            </form>
        </div>
    </div>
    )
}
