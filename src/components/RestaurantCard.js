import React from "react";
import { CDN_URL } from "../utils/constants";
import DarkModeContext from "../utils/darkModeContext"; 
import { useContext } from "react";

    
const RestaurantCard = ({ resData }) => {
    const { cloudinaryImageId, name, avgRating, cuisines, costForTwo } = resData;
    const { darkMode, setDarkMode } = useContext(DarkModeContext);
    return (
        <div className={`res-card ${darkMode ? 'bg-black  border  border-gray-500 shadow text-white' : 'bg-white text-gray-900'} shadow-lg rounded-2xl overflow-hidden transition-transform duration-300 transform hover:scale-105 max-h-80 min-h-80 hover:shadow-xl w-72 p-3`}>
            <img
                className="res-img w-full h-40 object-cover rounded-xl"
                src={CDN_URL + cloudinaryImageId}
                alt={name}
            />
            <div className="p-4">
                <h3 className="text-lg font-semibold">{name}</h3>
                <h4 className="text-sm mt-1">{cuisines.join(", ")}</h4>
                <div className="flex items-center justify-between mt-2">
                    <span className="text-sm font-semibold text-green-900">
                    ★ {avgRating}
                    </span>
                    <span className="text-sm">{costForTwo}</span>
                </div>
            </div>
        </div>
    );
};
export const withPromotedLabel  = (RestaurantCard)=>{
    return (props)=>{
        return (
            <div>
                <label> Promoted </label>
                <RestaurantCard  {...props}/>
            </div>
        )
    }
}

export default RestaurantCard;