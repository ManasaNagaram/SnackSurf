import React, { useContext } from "react";
import { CDN_URL } from "../utils/constants";
import DarkModeContext from "../utils/darkModeContext"; 
import AddRemoveButton from "./AddRemoveButton";

const ItemList = ({ items = [] }) => {
  const { darkMode, setDarkMode } = useContext(DarkModeContext);

  return (
    <div className={`w-full ${darkMode ? "bg-black text-white" : ""}`}>
      {items.map((item) => {
        const info = item?.card?.info;
        const isVeg = info?.itemAttribute?.vegClassifier === "VEG";
        const isBestseller = info?.isBestseller;
        const rating = info?.ratings?.aggregatedRating?.rating || "N/A";
        const ratingCount = info?.ratings?.aggregatedRating?.ratingCountV2 || "0";
        const price = info?.price || info?.defaultPrice;
        const finalPrice = info?.finalPrice;
        const imageUrl = info?.imageId ? `${CDN_URL}${info.imageId}` : "/placeholder.png";

        return (
          <div key={info?.id} className={`w-full my-2 mb-3 py-2 border-b ${darkMode ? "border-gray-700" : "border-gray-300"}`}>
            <div className="flex justify-between items-center w-full">
              {/* Left Side - Name, Price, Ratings */}
              <div className="w-3/4 pr-4">
                <div className="flex items-center gap-1">
                  {/* Veg / Non-Veg Indicator */}
                  <div className={`border ${isVeg ? "border-green-500" : "border-red-500"} rounded w-4 h-4 flex items-center justify-center`}>
                    <div className={`w-2 h-2 rounded-full border ${isVeg ? "bg-green-500 border-green-500" : "bg-red-500 border-red-500"}`}></div>
                  </div>

                  {/* Bestseller Tag */}
                  {isBestseller && (
                    <span className="ml-1 text-orange-600 text-xs font-bold px-2 py-1 rounded">
                      Bestseller
                    </span>
                  )}
                </div>

                {/* Item Name */}
                <span className={`block text-lg font-semibold ${darkMode ? "text-white" : "text-gray-900"} mt-1`}>
                  {info?.name}
                </span>

                {/* Price Handling with Strike-off */}
                <div className="mt-2 text-base font-medium">
                  {finalPrice ? (
                    <>
                      <span className="text-gray-500 line-through mr-2">
                        ₹{price / 100}
                      </span>
                      <span>₹{finalPrice / 100}</span>
                    </>
                  ) : (
                    <span>₹{price / 100}</span>
                  )}
                </div>

                {/* Ratings */}
                {ratingCount > 0 && (
                  <div className="flex items-center gap-1 text-sm font-bold mt-2 text-green-900">
                    ★ {rating} <span className="text-gray-700">({ratingCount})</span>
                  </div>
                )}
              </div>

              {/* Right Side - Image with Button */}
              <div className="w-1/4 mb-3 relative flex justify-center">
                {imageUrl && (
                  <img
                    src={imageUrl}
                    className="w-36 h-28 object-cover rounded-lg shadow-md"
                    onError={(e) => (e.target.style.display = "none")}
                  />
                )}
                <AddRemoveButton item={item} />
              </div>
            </div>

            {/* Description */}
            <p className={`mt-2 mb-1 leading-relaxed w-3/4 ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
              {info?.description}
            </p>
          </div>
        );
      })}
    </div>
  );
};

export default ItemList;
