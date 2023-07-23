import React from 'react';
import styles from "./MainSlider.module.css";
import Slider from "react-slick";
import slider1 from "../../finalProject assets/images/slider-image-2.jpeg"
import slider2 from "../../finalProject assets/images/slider-image-1.jpeg"
import slider3 from "../../finalProject assets/images/slider-image-3.jpeg"
import slider4 from "../../finalProject assets/images/slider-2.jpeg"
import slider5 from "../../finalProject assets/images/grocery-banner-2.jpeg"
export default function MainSlider() {
    const images=[slider1,slider2,slider3,slider4,slider5];
    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        pauseOnHover: true
    };
    return <>
        <Slider {...settings}>
            {images.map((img,index)=><img src={img} className={`w-100 mt-3 cursor-pointer ${styles.imgs}`} height="300" key={index} alt=""/>)}
        </Slider>
    </>
}
