import axios from "axios";
import { createContext, useContext, useState } from "react";
import { CartContext } from "./CartContext";
import { toast } from "react-hot-toast";

export const WishContext= createContext(null);
export function WishContextProvider({children}){
    const {token} = useContext(CartContext);
    const [isLoading,setisloading]= useState(false);

    async function AddWishlist(productId){
        try {
            if(token){
                setisloading(true);
                const {data}= await axios.post("https://route-ecommerce.onrender.com/api/v1/wishlist",{
                    productId,
                },{
                    headers:{
                        token,
                    }
                })
                if(data.status === "success"){
                    toast.success(data.message,{className:"bg-main text-white p-1"});
                    setisloading(false);
                }
            }else{
                toast.error("You didn't login",{className:"bg-danger text-white p-1"});
            }
        } catch (error) {
            console.log(error);
        }
    }

    function GetWishList(){
        return axios.get("https://route-ecommerce.onrender.com/api/v1/wishlist",{
            headers:{
                token,
            }
        }).then((data)=>data)
        .catch((error)=>error);
    }
    
    function DeleteWishList(id){
        return axios.delete(`https://route-ecommerce.onrender.com/api/v1/wishlist/${id}`,{
            headers:{
                token,
            }
        }).then((data)=>data)
        .catch((error)=>error);
    }

    return <WishContext.Provider value={{AddWishlist,isLoading,GetWishList,DeleteWishList}}>
        {children}
    </WishContext.Provider>
}