import React, { useContext, useEffect, useState } from 'react'
import { WishContext } from '../../Context/WishContext'
import { Link } from 'react-router-dom';
import Loading from '../Loading/Loading';
import { toast } from 'react-hot-toast';
import { Helmet } from 'react-helmet';

export default function WishList() {
    const {GetWishList,DeleteWishList}= useContext(WishContext);
    const [wishlists,setWishList]= useState([]);
    const [loading,setloading] =useState(false);

    async function getLoggedUserWish(){
        try {
            setloading(true);
            const response= await GetWishList();
            if(response?.data?.status === "success"){
                setWishList(response.data.data);
                setloading(false);
            }
            console.log(response.data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(()=>{
        getLoggedUserWish();
    },[])

    async function RemoveWishlist(id){
        try {
            const response= await DeleteWishList(id);
            if(response?.data?.status === "success"){
                toast.success(response.data.message,{className:"bg-main text-white p-1"});
                setWishList(response.data.data)
            }
            console.log(response);
        } catch (error) {
            console.log(error);
        }
    }
    return (<>
        <Helmet>
            <title>WishList</title>
        </Helmet>
        {wishlists && !loading ? <div className='mt-5 p-4'>
            {wishlists.length > 0? <h2 className='h5 fw-bold'>WishList Items :</h2>:""}
            {wishlists.length > 0 ? wishlists.map((wishlist, index) => <div className='row border mt-3 px-2 py-3' key={index}>
                <div className='col-md-10'>
                    <div className='row'>
                        <div className='col-md-1'>
                            <img src={wishlist.imageCover} className='w-100' alt={wishlist.title}></img>
                        </div>
                        <div className='col-md-11'>
                            <h3 className='h6 mb-4'>{wishlist.title}</h3>
                            <h3 className='h6 mb-4'>{wishlist.category.name}</h3>
                            {wishlist.priceAfterDiscount?<>
                                <h6 className='text-decoration-line-through'>{wishlist.price} EGP</h6>
                                <h6 className='fw-bold'>{wishlist.priceAfterDiscount} EGP</h6>
                            </>:<h6 className='fw-bold'>{wishlist.price} EGP</h6>}
                        </div>
                    </div>
                </div>
                <div className='col-md-2'>
                    <Link to="/checkout"><button className='btn my-2 mb-lg-4 bg-main text-white p-1'>Buy Now</button></Link>
                    <button className='btn d-block text-main p-1' onClick={()=>RemoveWishlist(wishlist._id)}><i className='fa-regular fa-trash-can me-1'></i> Remove</button>
                </div>
            </div>) : <div className='text-center pt-4'>
                <i className="fa-brands fa-gratipay text-main fa-4x"></i>
                <h3 className='fw-bold h6 mt-3'>You haven’t saved an item yet!</h3>
                <p className='text-muted font-sm'>Found something you like?<br /> Tap on the heart shaped icon next to the item to add it to your wishlist!<br></br> All your saved items will appear here.</p>
                <Link to="/" className='btn text-white bg-main font-sm mt-3 mb-3'>CONTINUE SHOPPING</Link>
            </div>}
        </div> : <Loading />}
        </>
    )
}
