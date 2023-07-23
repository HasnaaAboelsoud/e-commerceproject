import jwtDecode from "jwt-decode";
import { createContext, useEffect, useState } from "react";;

export const AuthenticContext= createContext("");
export function AuthenticContextProvider({children}){
    const [userData, setUserData] = useState(null);
    
    function saveData() {
        const encode = localStorage.getItem("userToken");
        const decoded = jwtDecode(encode);
        setUserData(decoded);
    }

    useEffect(() => {
        if (localStorage.getItem("userToken") != null && userData === null) {
            saveData();
        }
    }, []);

    return <AuthenticContext.Provider value={{userData,setUserData,saveData}}>
            {children}
        </AuthenticContext.Provider>
}