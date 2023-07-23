import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { toast } from "react-hot-toast";

export const CartContext= createContext("");
export function CartContextProvider({children}){
    const token=localStorage.getItem("userToken");
    const [cartId,setCartId]=useState("");
    const [numOfCartItems,setNumOfCartItems]=useState(0);
    const [isloading,setisLoading]= useState(false);

    function AddToCart(productId,token){
        return axios.post("https://ecommerce.routemisr.com/api/v1/cart",{
            productId,
        },{headers:{
            token,
        }}).then((data)=>data)
        .catch((error)=>error);
    }

    async function AddProductToCart(productId){
        if(token){
            setisLoading(true);
            const response= await AddToCart(productId,token);
            if(response.data.status === "success"){
                setisLoading(false);
                setNumOfCartItems(response.data.numOfCartItems);
                toast.success(response.data.message,{className:"bg-main font-sm py-1 text-white"});
            }else{
                setisLoading(false);
                toast.error("product not added",{className:"bg-danger py-1 text-white font-sm"})
            }
        }else{
            toast.error("you don't login",{className:"bg-danger py-1 text-white font-sm"});
        }
    }

    function GetLoggedUserCart(){
        return axios.get("https://ecommerce.routemisr.com/api/v1/cart",{
            headers:{
                token,
            }
        }).then((data)=>data)
        .catch((error)=>error);
    }

    function RemoveProduct(productId){
        return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`,{
            headers:{
                token,
            }
        }).then((data)=>data)
        .catch((error)=>error);
    }

    function ClearCart(){
        return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart`,{
            headers:{
                token,
            }
        }).then((data)=>data)
        .catch((error)=>error);
    }

    function UpdateProductCount(id,count){
        return axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${id}`,{
            count,
        },{
            headers:{
                token,
            }
        }).then((data)=>data)
        .catch((error)=>error);
    }
    
    // categories
    const [categories,setCategories]= useState([]);
    async function getCategories(){
        const {data}= await axios("https://ecommerce.routemisr.com/api/v1/categories");
        setCategories(data.data);
    }
    useEffect(()=>{
        getCategories();
    },[]);

    return <CartContext.Provider value={{categories,token,cartId,setCartId,isloading,numOfCartItems,setNumOfCartItems,AddProductToCart,GetLoggedUserCart,RemoveProduct,UpdateProductCount,ClearCart}}>
            {children}
        </CartContext.Provider>
}
