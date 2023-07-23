import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Loading from '../Loading/Loading';
import { CartContext } from '../../Context/CartContext';
import { WishContext } from '../../Context/WishContext';
import { Helmet } from 'react-helmet';

export default function CategoryProducts() {
    const {categoryId} = useParams();
    const [categoryProducts,setCategoryProducts]= useState([]);
    const [loading,setloading]= useState(false);
    const {AddProductToCart,isloading}= useContext(CartContext);
    const {AddWishlist,isLoading}= useContext(WishContext);

    async function GetCategoryProduct(){
        try {
            setloading(true);
            const {data}= await axios(`https://ecommerce.routemisr.com/api/v1/products`,{
                params:{
                    category: categoryId,
                }
            })
            setCategoryProducts(data.data);
            setloading(false);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(()=>{
        GetCategoryProduct();
    },[categoryId]);
    return (
    <div className='my-5 pt-4'>
        {categoryProducts && !loading?<>
            {categoryProducts.length > 0?<div className='row gy-3'>
                {categoryProducts?.map((product,index)=><div className='col-6 col-sm-4 col-md-3 product' key={index}>
                    <Helmet>
                        <title>{product.category.name}</title>
                    </Helmet>
                    <Link to={`/products/${product._id}`}>
                        <img src={product.imageCover} className='w-100' alt={product.title}></img>
                        <h3 className='h6 fw-bold mt-2'>{product.title.split(" ").slice(0,3).join(" ")}</h3>
                        <h6 className='font-sm fw-bold mt-1 text-main'>{product.brand.name}</h6>
                        <div className='position-relative mb-3'>
                            {product.priceAfterDiscount?<div>
                                <span className='font-sm text-muted text-decoration-line-through'>{product.price} EGP</span>
                                <span  className='font-sm text-muted ms-2'>{product.priceAfterDiscount} EGP</span>
                            </div>: <span className='font-sm text-muted'>{product.price} EGP</span>}
                            <div className='rating bg-main position-absolute end-0 rounded-pill text-white me-2'>
                                <span  className='font-sm2 rating  me-4 d-flex justify-content-center align-items-center'>{product.ratingsAverage} <i className='fas fa-star icon ms-1'></i></span>
                            </div>
                        </div>
                    </Link>
                    {isloading ? <button className='btn bg-main text-white w-100 p-4 mt-3'><i className='fas fa-spin fa-spinner'></i></button> : <button className='btn bg-main text-white w-100 p-1 mt-2' onClick={() => AddProductToCart(product._id)}>+ Add</button>}
                    {isLoading?<button className='btn border-main text-main p-1 mt-4 w-100'><i className='fas fa-spin fa-spinner'></i></button> :<button className='btn border-main text-main p-1 w-100 mt-2' onClick={()=>AddWishlist(product._id)}><i class="fa-regular fa-heart me-1"></i> Wishlist</button>}
                </div>)}
            </div>:<div className='text-center my-4'>
                <i class="fa-solid fa-triangle-exclamation fa-4x text-main my-2"></i>
                <h3 className='h5 fw-bold'>There are no Products Yet.</h3>
                <Link to="/" className='btn bg-main text-white mt-3 font-sm'>Continue Shopping</Link>
            </div>}
        </>:<Loading/>}
    </div>
    )
}

