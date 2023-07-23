import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import Loading from '../Loading/Loading';
import { CartContext } from '../../Context/CartContext';
import { WishContext } from '../../Context/WishContext';
import {Helmet} from "react-helmet";

export default function BrandProducts() {
    const {brandId} = useParams();
    const {AddWishlist,isLoading}= useContext(WishContext);
    const [BrandProducts,setBrandProducts]= useState([]);
    const [loading,setloading]= useState(false);
    const {isloading,AddProductToCart} =useContext(CartContext);

    async function GetBrandProducts(){
        try {
            setloading(true);
            const {data}= await axios.get(`https://ecommerce.routemisr.com/api/v1/products`,{
                params:{
                    brand : brandId,
                }
            });
            setBrandProducts(data.data);
            setloading(false);
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(()=>{
        GetBrandProducts();
    },[])
    return (
        <>
            
            {BrandProducts && !loading ? <div className='row mt-5 pt-3 gy-3'>
                {BrandProducts.length > 0?BrandProducts.map((brandProduct, index) => <div key={index} className='col-6 col-sm-4 col-md-3 product'>
                    <Helmet>
                        <title>{brandProduct.brand.name} Products</title>
                    </Helmet>
                    <Link to={`/products/${brandProduct._id}`}>
                        <img src={brandProduct.imageCover} className='w-100' alt={brandProduct.title}></img>
                        <h3 className='h6 fw-bold text-center mt-2'>{brandProduct.title.split(" ").slice(0,4).join(" ")}</h3>
                        <h6 className='h6 fw-bold text-main text-center mt-2'>{brandProduct.category.name}</h6>
                    </Link>
                    {isloading ? <button className='btn bg-main text-white w-100 p-1 mt-2'><i className='fas fa-spin fa-spinner'></i></button> : <button className='btn bg-main text-white w-100 p-1 mt-2' onClick={() => AddProductToCart(brandProduct._id)}>+ Add</button>}
                    {isLoading?<button className='btn border-main text-main p-1 mt-2 w-100'><i className='fas fa-spin fa-spinner'></i></button> :<button className='btn border-main text-main p-1 w-100 mt-2' onClick={()=>AddWishlist(brandProduct._id)}><i class="fa-regular fa-heart me-1"></i> Wishlist</button>}
                </div>):<div className='text-center my-4'>
                    <i class="fa-solid fa-triangle-exclamation fa-4x text-main my-2"></i>
                    <h3 className='h5 fw-bold'>There are no Products Yet.</h3>
                    <button className='btn bg-main text-white mt-3 font-sm'>Continue Shopping</button>
                </div>}
            </div> : <Loading />}
        </>
    )
}
