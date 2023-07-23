import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { CartContext } from '../../Context/CartContext';
import { WishContext } from '../../Context/WishContext';
import Loading from '../Loading/Loading';
import ReactPaginate from 'react-paginate';

export default function FeaturedProduct() {
    const [products,setProducts]= useState([]);
    const [loading,setloading]= useState(false);
    const {AddProductToCart,isloading}= useContext(CartContext);
    const {AddWishlist,isLoading}= useContext(WishContext);
    const [pagenum,setpageNum]= useState({});
    const pages= new Array(pagenum.numberOfPages).fill(1).map((page,index)=>index + 1);

    async function getProducts(page){
        setloading(true);
        const {data}= await axios("https://ecommerce.routemisr.com/api/v1/products",{
            params:{
                page,
            }
        });
        setProducts(data.data);
        setpageNum(data.metadata);
        setloading(false);
    }
    useEffect(()=>{
        getProducts(1);
    },[]);

    return <>
        
        <div className='row py-5'>
            {products.length > 0 && !loading?products.map((product)=><div key={product._id} className='col-6 col-sm-4 col-md-3'>
                <div className='product px-2 py-2 cursor-pointer'>
                    <Link to={`/products/${product._id}`}>
                        <img src={product.imageCover} className='w-100 pb-2' alt={product.title}></img>
                        <h3 className='h6 fw-bolder'>{product.title.split(" ").slice(0, 2).join(" ")}</h3>
                        <span className='font-sm fw-bold text-main'>{product.category.name}</span>
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
                    {isloading?<button className='btn bg-main text-white w-100 p-1 mt-2'><i className='fas fa-spin fa-spinner'></i></button>:<button className='btn bg-main text-white w-100 p-1 mt-2' onClick={()=>AddProductToCart(product._id)}>+ Add</button>}
                    {isLoading?<button className='btn border-main text-main w-100 p-1 mt-2'><i className='fas fa-spin fa-spinner'></i></button>:<button className='btn border-main text-main w-100 p-1 mt-2' onClick={()=>AddWishlist(product._id)}><i class="fa-regular fa-heart text-main me-3"></i></button>}
                </div>
            </div>):<Loading/>}
        </div>

        <ReactPaginate
            previousLabel ={"< previous"}
            nextLabel={"next >"}
            pageCount={pagenum.numberOfPages}
            onPageChange={()=>{pages.map((page)=>getProducts(page))}}
            containerClassName='pagination d-flex justify-content-center'
            pageClassName='page-item'
            pageLinkClassName='page-link text-main font-sm fw-bold'
            previousClassName='page-item'
            previousLinkClassName='page-link text-main font-sm fw-bold'
            nextClassName='page-item'
            nextLinkClassName='page-link text-main font-sm fw-bold'
            activeClassName='active'
        />
    </>
}
