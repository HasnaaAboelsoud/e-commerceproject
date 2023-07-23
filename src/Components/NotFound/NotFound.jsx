import React from 'react';
import img from "../../finalProject assets/images/error.svg"
export default function NotFound() {
    return <>
        <div className='text-center'>
        <img src={img} alt="errorMessage" className='w-50'></img>
        </div>
    </>
}
