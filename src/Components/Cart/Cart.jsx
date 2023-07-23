import React, { useContext, useEffect, useState } from 'react';
import { CartContext } from '../../Context/CartContext';
import Loading from '../Loading/Loading';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { Helmet } from 'react-helmet';
export default function Cart() {
    const {setCartId,GetLoggedUserCart,setNumOfCartItems,token,RemoveProduct,UpdateProductCount,ClearCart}= useContext(CartContext);
    const [Products,setProducts]=useState(null);
    const [loading,setLoading]=useState(false);
    const navigate= useNavigate();
    
    async function GetDataCart(){
        if (token){
            setLoading(true);
            const response= await GetLoggedUserCart(token);
            if(response?.data?.status === "success"){
                console.log(response);
                setProducts(response.data.data);
                setCartId(response.data.data._id);
                setNumOfCartItems(response.data.numOfCartItems);
                setLoading(false);
            }else{
                toast.error("No Produts in cart",{className:"bg-danger text-white p-1"});
                navigate("/");
            }
        }
    }
    useEffect(()=>{
        GetDataCart();
    },[]);

    async function DeleteProduct(productId){
        if(token){
            const response= await RemoveProduct(productId);
            if(response?.data?.status === "success"){
                toast.success("product has been removed",{className:"bg-main text-white font-sm py-1"})
                setProducts(response.data.data);
                setNumOfCartItems(response.data.numOfCartItems);
            }
        }
    }

    async function ClearProducts(){
        setLoading(true);
        const response= await ClearCart();
        if(response.data.message === "success"){
            setProducts(response.data.data);
            setNumOfCartItems(response.data.numOfCartItems);
            setLoading(false);
        }
    }

    async function UpdateProduct(id,count){
        if(token){
            const response= await UpdateProductCount(id,count);
            toast.success("product updated",{className:"bg-main text-white font-sm py-1"});
            setProducts(response.data.data);
        }
    }
    return <>
        {Products && !loading ? <>
            <Helmet>
                <title>Cart</title>
            </Helmet>

            {Products.products.length > 0 ? <>
                <div className='d-flex justify-content-between mt-5 pt-4 px-3'>
                    <h3 className='h5 fw-bolder'>Shop Cart :</h3>
                    {Products?.products?.length > 0 ? <button className='btn p-0 m-0 font-sm cursor-pointer' onClick={ClearProducts}><i className='fa-regular fa-trash-can me-1'></i>Clear All</button> : ""}
                </div>
                <div className='px-4 mb-3'>
                    {Products.products?.filter((product)=> product.count > 0).map((product) => <div key={product.product._id} className='row my-2 py-3 bg-main-light'>
                        <div className='col-md-10'>
                            <div className='row'>
                                <div className='col-sm-2 col-lg-1'>
                                    <img src={product.product.imageCover} className='w-100' alt={product.product.title}></img>
                                </div>
                                <div className='col-sm-10 col-lg-11 d-flex justify-content-between align-items-center'>
                                    <div className='mt-3 mt-md-0'>
                                        <h6 className='font-sm' title={product.product.title}>{product.product.title}</h6>
                                        <h6 className='font-sm fw-semibold'>{product.price} EGP</h6>
                                        <button className='btn p-0 m-0 font-sm text-muted' onClick={() => DeleteProduct(product.product._id)}><i className='fa-regular fa-trash-can text-muted me-1'></i>Remove</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='col-md-2 mt-2'>
                            <button className='btn border-main fw-bold text-main btn-sm py-0' onClick={() => UpdateProduct(product.product._id, product.count + 1)}>+</button>
                            <span className='mx-2 font-sm fw-bold'>{product.count}</span>
                            <button className='btn  btn-sm py-0 border-main fw-bold text-main' onClick={() => UpdateProduct(product.product._id, product.count - 1)}>-</button>
                        </div>
                    </div>)}
                    {Products?.products?.length > 0 ? <>
                        <h4 className='fw-bold h6 font-sm mt-4'>CART SUMMARY</h4>
                        <div className='d-flex justify-content-between align-items-center px-3'>
                            <h6 className='mb-3 font-sm fw-bold'>Total : {Products.totalCartPrice} EGP</h6>
                            <Link to="/checkout" className='btn bg-main text-white font-sm py-1'>CHECKOUT</Link>
                        </div>
                    </> : ""}
                    <Link to="/" className='btn text-white bg-main font-sm py-1 mb-3'>Continue Shopping</Link>
                </div>
            </> : <div className='text-center my-5 pt-5'>
                <i className="fa-solid fa-cart-shopping text-main fa-4x"></i>
                <h3 className='mt-3 h6 fw-bold'>Your cart is empty!</h3>
                <p className='text-muted font-sm'>Browse our categories and discover our best deals</p>
            </div>}
        </> : <Loading />}
    </>
}
