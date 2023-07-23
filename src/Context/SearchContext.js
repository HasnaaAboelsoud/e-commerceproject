import axios from "axios";
import { createContext, useState } from "react";

export const SearchContext= createContext("");
export function SearchContextProvider({children}){
    const [searchedProducts,setSearchedProducts]= useState([]);
    const [loading,setloading]= useState(false);
    const [term,setTerm]= useState("");

    async function SearchProducts(term){
        try {
            console.log(term);
            setloading(true);
            const {data}= await axios("https://ecommerce.routemisr.com/api/v1/products",{
                params:{
                    title:term,
                }
            });
            console.log(data);
            setSearchedProducts(data.data);
            setTerm(term);
            setloading(false);
        } catch (error) {
            console.log(error);
        }
    }

    return <SearchContext.Provider value={{term,SearchProducts,searchedProducts,loading}}>
        {children}
    </SearchContext.Provider>
}