import axios from "axios";
import { createContext } from "react";

export const AddressesContext= createContext("");
export function AddressesContextProvider({children}){
    const token= localStorage.getItem("userToken");
    function AddAddresses(values){
        return axios.post("https://ecommerce.routemisr.com/api/v1/addresses",values,{
            headers:{
                token,
            }
        }).then((data)=>data)
        .catch((error)=>error);
    }

    // function getLoggedUserAddress(){
    //     return axios.get("https://ecommerce.routemisr.com/api/v1/addresses",{
    //         headers:{
    //             token,
    //         }
    //     }).then((data)=>{
    //         return data;
    //     })
    //     .catch((error)=>console.log(error));
    // }
    
    function Deleteaddress(id){
        return axios.delete(`https://ecommerce.routemisr.com/api/v1/addresses/${id}`,{
            headers:{
                token,
            }
        }).then((data)=>data)
        .catch((error)=>error);
    }
    return <AddressesContext.Provider value={{AddAddresses,Deleteaddress}}>
        {children}
    </AddressesContext.Provider>
}