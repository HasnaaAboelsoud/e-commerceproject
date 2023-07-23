import React from 'react';
import FeaturedProduct from '../FeaturedProduct/FeaturedProduct';
import MainSlider from '../MainSlider/MainSlider';
import CategorySlider from '../CategorySlider/CategorySlider';
import { Helmet } from 'react-helmet';
export default function Home() {
    return <div className='pt-5'>
        <Helmet>
            <title>Home Page</title>
        </Helmet>
        <MainSlider/>
        <CategorySlider/>
        <FeaturedProduct/>
    </div>
}
