import React, { useContext, useEffect, useState } from 'react';
import Slider from "react-slick";
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Loading from '../Loading/Loading';
import { CartContext } from '../../Context/CartContext';
import { WishContext } from '../../Context/WishContext';
import { Helmet } from 'react-helmet';

export default function ProductDetails() {
    const [productDetails,setProductDetails]=useState({});
    const [loading,setLoading]= useState(false);
    const {id}= useParams();
    const {AddProductToCart,isloading}= useContext(CartContext);
    const {AddWishlist,isLoading}= useContext(WishContext);

    async function GetProductDetails(){
        setLoading(true);
        const {data}= await axios(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
        setProductDetails(data.data);
        setLoading(false);
    }
    useEffect(()=>{
        GetProductDetails();
    },[]);

    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
    };
    return <>
        <Helmet>
            <title>Product Details</title>
        </Helmet>
        {loading?<Loading/>:<div className='row p-5 mt-5'>
            <div className='col-md-3'>
                <Slider {...settings}>
                    {productDetails.images?.map((image) => <img key={productDetails._id} src={image} className='mb-3' alt=""></img>)}
                </Slider>
            </div>
            <div className='col-md-9 mt-4'>
                <h2 className='h6 fw-bolder'>{productDetails.title}</h2>
                <p className='font-sm my-2 text-muted'>{productDetails.description}</p>
                <h6 className='font-sm2 fw-bold'>{productDetails.category?.name}</h6>
                <h6 className='font-sm2 fw-bold'>{productDetails.brand?.name}</h6>
                <div className='position-relative mb-3'>
                            {productDetails.priceAfterDiscount?<div>
                                <span className='font-sm text-muted text-decoration-line-through fw-bold'>{productDetails.price} EGP</span>
                                <span  className='font-sm text-muted ms-2 fw-bold'>{productDetails.priceAfterDiscount} EGP</span>
                            </div>: <span className='font-sm text-muted fw-bold'>{productDetails.price} EGP</span>}
                            <div className='rating bg-main position-absolute top-0 end-0 rounded-pill text-white me-2'>
                                <span  className='font-sm2 rating  me-4 d-flex justify-content-center align-items-center'>{productDetails.ratingsAverage} <i className='fas fa-star icon ms-1'></i></span>
                            </div>
                        </div>
                        <div>
                            {isloading?<button className='btn bg-main text-white p-1 mt-2 w-100'><i className='fas fa-spin fa-spinner'></i></button>:<button className='btn bg-main text-white p-1 w-100 mt-2' onClick={()=>AddProductToCart(productDetails._id)}>+ Add to Cart</button>}
                            {isLoading?<button className='btn border-main text-main p-1 mt-2 w-100'><i className='fas fa-spin fa-spinner'></i></button> :<button className='btn border-main text-main p-1 w-100 mt-2' onClick={()=>AddWishlist(productDetails._id)}><i class="fa-regular fa-heart me-1"></i> Wishlist</button>}
                        </div>
            </div>
        </div>}
    </>
}
