import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Loading from '../Loading/Loading';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
export default function Brands() {
    const [brands,setBrands]= useState([]);
    const [loading,setloading]= useState(false);

    async function GetBrands(){
        try {
            setloading(true);
            const {data}= await axios.get("https://ecommerce.routemisr.com/api/v1/brands");
            setBrands(data.data);
            setloading(false);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(()=>{
        GetBrands();
    },[])

    return <div className='my-5 pt-4'>
        <Helmet>
            <title>Brands</title>
        </Helmet>
        {brands && !loading?<div className='row align-items-center'>
            <div className='col-sm-4 col-md-3 mt-4 pt-4 text-center'>
                <h2 className='h4 fw-bold text-main'>Our Brands</h2>
                <p className='text-muted font-sm2'>You can see our brands and each brand includes the products in it.</p>
            </div>
            {brands.map((brand,index)=><div className='col-6 col-sm-4 col-md-3' key={index}>
                <Link to={`/brandproducts/${brand._id}`}>
                    <img src={brand.image} className='w-100' alt={brand.name}></img>
                    <h6 className='text-main font-sm fw-bold text-center'>{brand.name}</h6>
                </Link>
            </div>)}
        </div>:<Loading/>}
    </div>
}
