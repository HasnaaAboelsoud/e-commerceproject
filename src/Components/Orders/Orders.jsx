import React, { useContext, useEffect, useState } from 'react'
import { AuthenticContext } from '../../Context/AutenticationContext';
import axios from 'axios';
import Loading from '../Loading/Loading';
import { Helmet } from 'react-helmet';

export default function Orders() {
    const {userData}= useContext(AuthenticContext);
    const [orders,setOrders]= useState([]);
    const [loading,setloading]=useState(false);

    async function getUserOrders(){
        try {
            setloading(true);
            const {data}= await axios.get(`https://route-ecommerce.onrender.com/api/v1/orders/user/${userData.id}`);
            setOrders(data);
            setloading(false);
        } catch (error) {
            return error;
        }
    }

    useEffect(()=>{
        getUserOrders();
    },[])
    return (<div className='py-4'>
        <Helmet>
            <title>Orders page</title>
        </Helmet>
        {orders && !loading?<div className='mb-3 mt-5 bg-main-light p-3'>
            <h3 className='h5 fw-bold mb-3'>Orders ( {orders.length} )</h3>
            {orders.length > 0?orders.map((order,index)=><div key={index} className='border border-2 p-3 mb-2'>
                <h4 className='fw-bold h5'>Items in your order :</h4>
                {order.cartItems.map((item, index) => <div className='row mb-2 border mx-1 px-1 py-2'>
                    <div key={index} className='col-sm-2 col-lg-1'>
                        <img src={item.product.imageCover} className='w-100' alt={item.product.title}></img>
                    </div>
                    <div className='col-sm-10 col-lg-11'>
                        <h6 className='fw-semibold font-sm mt-2'>{item.product.title}</h6>
                        <p className='font-sm mb-1'>{item.product.category.name}</p>
                        <span className='fw-bold'>{item.price} EGP</span>
                    </div>
                </div>)}
                <h4 className='fw-bold h5 mt-3'>Order Details :</h4>
                <div className='px-3'>
                    {order.shippingPrice !== true ? <h6 className='mb-1'>Free Shipping</h6> : <h6 className='mb-1'>Shipping Price : {order.shippingPrice}</h6>}
                    <span className='fw-bold'>Total : {order.totalOrderPrice + order.shippingPrice} EGP</span>
                    {order.paymentMethodType === "cash" ? <h6 className='font-sm'>Not Paid</h6> : <h6>Paid</h6>}
                    {order.isDelivered === true ? <p className='text-main fw-bold'>Delivered</p> : <p className='text-main fw-bold'>SHIPPED</p>}
                </div>
            </div>):<h3 className='my-5 fw-bold text-center'>No orders Yet</h3>}
        </div>:<Loading/>}
    </div>
    )
}
