import React,{lazy,Suspense, useState} from "react";
import ReactDOM from "react-dom/client"
import Header from "./components/Header";
import Body from "./components/Body";

import Shimmer from "./components/Shimmer";
import Error from "./components/Error";
import "../style.css";
import { Provider } from "react-redux";
import {
    createBrowserRouter as Router,
    RouterProvider,
    Outlet
  } from "react-router";
import RestaurantMenu from "./components/RestauarantMenu";

import appStore from "./utils/appStore";
import Cart from "./components/Cart";
import { DarkModeProvider } from "./utils/darkModeContext"; 
import ItemDetails from "./components/ItemDetails";
const Grocery = lazy(()=>import("./components/Grocery"));
const App = ()=>{
   
    return ( 
        <Provider store={appStore}>
           <DarkModeProvider>

            <>
                <div className="app">

                    <Header/>
                    <Outlet/>
                    {/* if path is / we should heve body component*/}
                    {/* <Body/> */}
                    {/* if path is /about we should heve About  component*/}
                    {/* <About/> */}
                    {/* if path is /about we should heve   Contact component*/}
                    {/* <Contact/> */}
                </div>
            </>
            </DarkModeProvider>
            
        </Provider>   
    )
}

const appRouter = Router([
    {
        path:"/",
        element:<App/>,
        children:[
            {
                path:"/",
                element:<Body/> 
            },
            {
                path:"/restaurant/:resId",
                element:<RestaurantMenu/>   
            },{
                path:"/grocery",
                element:<Suspense fallback={<Shimmer/>} > <Grocery/></Suspense>
            },
            {
                path:"/cart",
                element:<Cart/>
            },
            {
                path:"/item-details/:id",
                element:<ItemDetails/>
            }

            
        ],
        errorElement:<Error/>
    },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={appRouter} />);


