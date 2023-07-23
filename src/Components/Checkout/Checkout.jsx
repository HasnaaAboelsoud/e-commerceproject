import { useFormik } from 'formik'
import React, { useContext } from 'react'
import { CartContext } from '../../Context/CartContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Helmet } from 'react-helmet';

export default function Checkout() {
    const {cartId,token,setNumOfCartItems}=useContext(CartContext);
    const navigate= useNavigate();
    
    const formik=useFormik({
        initialValues:{
            details:"",
            phone:"",
            city:"",
        },
        onSubmit: HandleSubmit,
    })
    async function HandleSubmit(shippingAddress){
        console.log(cartId);
            return axios.post(`https://ecommerce.routemisr.com/api/v1/orders/${cartId}`,{
                shippingAddress,
            },{
                headers:{
                    token,
                }
            }).then((response)=>{
                if(response?.data?.status === "success"){
                    navigate("/allorders");
                    setNumOfCartItems(response.data.numOfCartItems);
                }
            })
            .catch((error)=>console.log(error));
    }
    
    function onlinePayment(){
        return axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=http://localhost:3000`,{
            shippingAddress:{
                details: document.querySelector("#details").value,
                phone: document.querySelector("#phone").value,
                city: document.querySelector("#city").value,
            }
        },{
            headers:{
                token,
            }
        }).then((response)=>{
            if(response?.data?.status === "success"){
                window.open(response?.data?.session.url,"_self");
                setNumOfCartItems(response.data.numOfCartItems);
            }
        })
        .catch((error)=>error);
    }

    return (
    <div className='w-50 mx-auto my-5 pt-4'>
        <Helmet>
            <title>Checkout</title>
        </Helmet>
        <form onSubmit={formik.handleSubmit}>
            <label htmlFor='details'>Details :</label>
            <input type="text" value={formik.values.details} onChange={formik.handleChange} className='form-control mb-2 p-1' name="details" id="details" required></input>

            <label htmlFor='phone'>Phone :</label>
            <input type="tel" value={formik.values.phone} onChange={formik.handleChange} className='form-control mb-2 p-1' name="phone" id="phone" required></input>
        
            <label htmlFor='city'>city :</label>
            <input type="text" value={formik.values.city} onChange={formik.handleChange} className='form-control mb-2 p-1' name="city" id="city" required></input>
        
            <div className='mt-3 mb-5'>
                <button onClick={onlinePayment} type="submit" className='btn w-100 bg-main mb-2 text-white py-1 mx-1 px-5'>Credit pay</button>
                <button type="submit" className='btn bg-main text-white w-100 py-1 mx-1 px-5'>Cash pay</button>
            </div>
        </form>
    </div>
    )
}
