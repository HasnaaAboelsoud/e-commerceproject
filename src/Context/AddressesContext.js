import axios from "axios";
import { createContext, useState } from "react";

export const AddressesContext= createContext("");
export function AddressesContextProvider({children}){
    const token= localStorage.getItem("userToken");
    const [Phone,setPhone]= useState("");
    function AddAddresses(values){
        return axios.post("https://ecommerce.routemisr.com/api/v1/addresses",values,{
            headers:{
                token,
            }
        }).then((data)=>data)
        .catch((error)=>error);
    }

    function getLoggedUserAddress(){
        return axios.get("https://ecommerce.routemisr.com/api/v1/addresses",{
            headers:{
                token,
            }
        }).then((data)=>{
            setPhone(data.data.data.phone)})
        .catch((error)=>error);
    }
    
    function Deleteaddress(id){
        return axios.delete(`https://ecommerce.routemisr.com/api/v1/addresses/${id}`,{
            headers:{
                token,
            }
        }).then((data)=>data)
        .catch((error)=>error);
    }
    return <AddressesContext.Provider value={{Phone,AddAddresses,getLoggedUserAddress,Deleteaddress}}>
        {children}
    </AddressesContext.Provider>
}