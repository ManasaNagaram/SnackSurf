import React, { useContext, useState } from "react";
import logo from "../utils/image.png";
import { Link } from "react-router";
import { useContext } from "react";
import { useSelector } from "react-redux";
import { lightmodeCart,darkModeCart } from "../utils/constants";
import { Sun, Moon } from "lucide-react";
import DarkModeContext from "../utils/darkModeContext"; 
export const Header = () => {
    const [btnName, setBtnName] = useState("Login");
    const { darkMode, setDarkMode } = useContext(DarkModeContext);
    const cartItems = useSelector((store) => store.cart.items);


    let count = cartItems.reduce((total, item) => total + item.quantity, 0);

    return (    
        <div className={`flex justify-between items-center px-6  shadow-lg  transition-all ${darkMode ? 'bg-black text-white' : 'bg-gray-100 text-gray-900'}`}>
            {/* Logo */}
            <div className="px-2">
                <img className="w-24" src={logo} alt="Logo" />
            </div>

            {/* Navigation Links */}
            <div className="">
                <ul className="flex space-x-6 text-base font-medium">
                    <li><Link className="cursor-pointer" to="/">Home</Link></li>
                   
                    <li>
                        <div className="cursor-pointer relative">
                        <Link to="/cart">
                            <img className="w-6" src={darkMode ? darkModeCart : lightmodeCart} alt="cart" />
                         </Link>

                            {count > 0 && (
                             <span
                             className={`w-4 h-4 cursor-pointer text-[10px] rounded-full flex items-center justify-center absolute top-1/4 right-0 transform -translate-y-1/2 -mr-2
                             ${darkMode ? "text-black bg-gray-200" : "text-white bg-black"}`}>
                                    {count}
                                </span>
                            )}
                        </div>
                    </li>
                    {/* <li>
                        <button onClick={() => setBtnName(btnName === "Login" ? "Logout" : "Login")}> {btnName} </button>
                    </li> */}
                    
                    <li>
                        {/* Dark Mode Toggle */}
                        <button className="cursor-pointer" onClick={() => setDarkMode(!darkMode)} >
                            {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                        </button>
                    </li>
                </ul>
            </div>

            
        </div>
    );
};

export default Header;