import React, { useState, useEffect, useContext } from "react";
import RestaurantCard,{withPromotedLabel} from "./RestaurantCard";
import Shimmer from "./Shimmer";
import { Link } from "react-router";
import useOnlineStatus from "../utils/useOnlineStatus";
import { useContext } from "react";
import DarkModeContext from "../utils/darkModeContext"; 
import { CDN_URL } from "../utils/constants";

const Body = () => {
    const [resList, setResList] = useState([]);
    const [filteredRes, setFilteredRes] = useState([]);
    const [whatsonurmind,setWhatsonurmind]=useState([]);
    const [searchText, setSearchText] = useState("");
    const Onlinestatus = useOnlineStatus();
    const ResCardPromoted = withPromotedLabel(RestaurantCard);
    const { darkMode, setDarkMode } = useContext(DarkModeContext);
    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        const data = await fetch(
            "https://www.swiggy.com/dapi/restaurants/list/v5?lat=17.406498&lng=78.47724389999999&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING"
        );
        const json = await data.json();
        
        const items = json?.data?.cards[0]?.card?.card?.gridElements?.infoWithStyle?.info || [];
        setWhatsonurmind(items);

        let newList =
            json?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle
                ?.restaurants || [];
        setFilteredRes(newList);
        setResList(newList);
    };

    if (!Onlinestatus) {
        return (
            <h1 className="text-center text-xl font-semibold text-red-500 mt-10">
                ⚠️ Looks like you're offline!
            </h1>
        );
    }

    return resList.length === 0 ? (
        <Shimmer />
    ) : (
        <div className={`body p-4 min-h-screen ${darkMode ? 'bg-black text-white' : 'bg-white text-black'}`}>

            {/* Search & Filter Section */}
            <div className="filter flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
                {/* Search Box */}
                <div className="flex items-center gap-2 w-full sm:w-auto">
                    <input
                        type="text"
                        className="border border-gray-400 text-xs rounded-lg py-1 px-2 w-full sm:w-48"
                        placeholder="Search restaurants..."
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                    />
                    <button
                        className="border-green-400 text-green-400 border px-4 rounded-lg hover:border-green-300 transition"
                        onClick={() => {
                            const filtered = resList.filter(
                                (ele) =>
                                    ele.info.name
                                        .toLowerCase()
                                        .includes(searchText.toLowerCase()) ||
                                    ele.info.cuisines.some((cuisine) =>
                                        cuisine
                                            .toLowerCase()
                                            .includes(searchText.toLowerCase())
                                    )
                            );
                            setFilteredRes(filtered);
                        }}
                    >
                        Search
                    </button>
                </div>
                
                {/* <label>UserName:</label>
                <input type="text" className="border-b-2 border" value={loggedInUser}   onChange={(e) => setUserInfo(e.target.value)}></input> */}
               
                {/* Filter Button */}
                <button
                   className={`px-5 py-1 border ${darkMode ? 'border-gray-700 text-white dark:hover:bg-gray-700' : 'border-gray-300 text-black hover:bg-gray-100'} rounded-lg transition`}

                    onClick={() => {
                        setFilteredRes(resList.filter((ele) => ele.info.avgRating > 4.5));
                    }}
                >
                   ★  Top Rated
                </button>
            </div>
            <h1 className="text-lg font-semibold text-center mb-4">What's on your mind?</h1>
            <div className="flex gap-3 overflow-x-auto p-4 scrollbar-hide">
                

  
            {Array.isArray(whatsonurmind) &&
  
  whatsonurmind.map((item) => (
   
      <div
        className="w-32 h-32  flex-shrink-0 transition-transform transform hover:scale-105"
      >     
        <img
          src={CDN_URL + item.imageId}
          alt={item.action?.text}
          className="w-22  rounded-lg object-center"
         
        />
      </div>
   
  ))


}
    

</div>


            {/* Restaurant Cards Container */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mx-auto">
                {filteredRes.map((resData) => (
                    <Link to={`/restaurant/${resData.info.id}`} key={resData.info.id}>
                        
                        {resData?.promoted ? <ResCardPromoted resData={resData.info} /> : <RestaurantCard resData={resData.info} />}
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default Body;
