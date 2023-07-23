import React, { useContext } from 'react';
import styles from "./CategorySlider.module.css";
import Slider from "react-slick";
import Loading from '../Loading/Loading';
import { CartContext } from '../../Context/CartContext';
import { Link } from 'react-router-dom';

export default function CategorySlider() {
    const {categories}= useContext(CartContext);
    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
    };
    return <>
        {categories.length === 0?<Loading/>:<>
        <h2 className='fw-bolder h5 mb-3 mt-5'>Shop popular Categories</h2>
        <Slider {...settings}>
            {categories.map((category)=><div key={category._id}>
            <Link className="nav-link font-sm fw-bold" to={`/categoryproducts/${category._id}`}>
                <img src={category.image} className={`w-100 cursor-pointer ${styles.images}`} alt={category.name}></img>
                <h3 className='h6 font-sm2 fw-bold mt-1 px-1 text-center'>{category.name}</h3>
            </Link>
            </div>)}
        </Slider></>}
    </>
}
