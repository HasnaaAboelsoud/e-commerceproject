import { RouterProvider, createBrowserRouter, createHashRouter } from 'react-router-dom';
import './App.css';
import Layout from './Components/Layout/Layout';
import Home from './Components/Home/Home';
import Login from './Components/Login/Login';
import Register from './Components/Register/Register';
import Cart from './Components/Cart/Cart';
import Brands from './Components/Brands/Brands';
import Products from './Components/CategoryProducts/CategoryProducts';
import NotFound from './Components/NotFound/NotFound';
import ProtectedRouter from './Components/ProtectedRouter/ProtectedRouter';
import ProductDetails from './Components/ProductDetails/ProductDetails';
import { CartContextProvider } from './Context/CartContext';
import  { Toaster } from 'react-hot-toast';
import {  AuthenticContextProvider } from './Context/AutenticationContext';
import Orders from './Components/Orders/Orders';
import Checkout from './Components/Checkout/Checkout';
import ForgetPassword from './Components/ForgetPassword/ForgetPassword';
import ResetPassword from './Components/ResetPassword/ResetPassword';
import Profile from './Components/Profile/Profile';
import BrandProducts from './Components/BrandProducts/BrandProducts';
import { WishContextProvider } from './Context/WishContext';
import WishList from './Components/WishList/WishList';
import {  AddressesContextProvider } from './Context/AddressesContext';
import UserProfile from './Components/UserProfile/UserProfile';
import Addresses from './Components/Addresses/Addresses';
import ChangePassword from './Components/ChangePassword/ChangePassword';
import AddressForm from './Components/AddressForm/AddressForm';
import { Offline } from "react-detect-offline";
import CategoryProducts from './Components/CategoryProducts/CategoryProducts';
import { SearchContextProvider } from './Context/SearchContext';
import SearchProducts from './Components/SearchProduct/SearchProducts';

function App() {

  const routers=createHashRouter([
    {path: "",element: <Layout/>,children:[
      {index: true,element:<ProtectedRouter><Home/></ProtectedRouter>},
      {path:"/login",element:<Login/>},
      {path:"/forgetpassword",element:<ForgetPassword/>},
      {path:"/resetpassword",element:<ResetPassword/>},
      {path:"/register",element:<Register/>},
      {path:"/categoryproducts/:categoryId",element:<ProtectedRouter><CategoryProducts/></ProtectedRouter>},
      {path:"/products/:id",element:<ProductDetails/>},
      {path:"/cart",element:<ProtectedRouter><Cart/></ProtectedRouter>},
      {path:"/brands",element:<ProtectedRouter><Brands/></ProtectedRouter>},
      {path:"/brandproducts/:brandId",element:<ProtectedRouter><BrandProducts/></ProtectedRouter>},
      {path:"/allorders",element:<ProtectedRouter><Orders/></ProtectedRouter>},
      {path:"/addresses",element:<ProtectedRouter><Addresses/></ProtectedRouter>},
      {path:"/addressform",element:<ProtectedRouter><AddressForm/></ProtectedRouter>},
      {path:"/userprofile",element:<ProtectedRouter><UserProfile /></ProtectedRouter>,children:[
        {index:true,element:<Profile/>},
        {path:"orders",element:<Orders/>},
        {path:"wishlist",element:<WishList/>},
        {path:"addresses",element:<Addresses/>},
        {path:"changepassword",element:<ChangePassword/>},
      ]},
      {path:"/wishlist",element:<ProtectedRouter><WishList/></ProtectedRouter>},
      {path:"/checkout",element:<ProtectedRouter><Checkout/></ProtectedRouter>},
      {path:"/searchproducts",element:<ProtectedRouter><SearchProducts/></ProtectedRouter>},
      {path:"*",element:<NotFound/>},
    ]}
  ])
  return <>
    <CartContextProvider>
      <WishContextProvider>
        <AuthenticContextProvider>
            <AddressesContextProvider>
              <SearchContextProvider>
                <Offline><p className='network bg-danger text-white p-2 font-sm rounded'>You're Offline</p></Offline>
                <Toaster />
                <RouterProvider router={routers}></RouterProvider>
              </SearchContextProvider>
            </AddressesContextProvider>
        </AuthenticContextProvider>
      </WishContextProvider>
    </CartContextProvider>
  </>
}

export default App;
