import React, { useContext } from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeItem ,clearCart, addItem} from "../utils/cartSlice";
import { CDN_URL } from "../utils/constants";
import AddRemoveButton from "./AddRemoveButton";
import DarkModeContext from "../utils/darkModeContext";

const Cart = () => {
  const { darkMode } = useContext(DarkModeContext); 
  const cartItems = useSelector((store) => store.cart.items);
  const  totalCost = 0;
  
  const dispatch = useDispatch();
  const handleClearCart = ()=>{
    dispatch(clearCart());
  }
  
  const handleAddItem = (item) => {
    dispatch(addItem(item));
  };

  return (
    <div className={`w-full flex-col align-middle justify-center relative min-h-screen p-4 ${darkMode ? 'bg-black text-white' : 'bg-white text-black'}`}>
       {cartItems.length !== 0  && <button className=" absolute right-4 border m-2 text-red-500 border-red-100 rounded-lg px-4 py-0.5 transition duration-300 ease-in-out" onClick={handleClearCart}>Clear Cart</button>}
    <div className="w-full p-4">
      {cartItems.length === 0 ? (
        <p className="text-center text-lg font-semibold">Your cart is empty.</p>
      ) : (
        cartItems.map((item) => {
          const info = item?.card?.info;
          const isVeg = info?.itemAttribute?.vegClassifier === "VEG";
          const isBestseller = info?.isBestseller;
          const rating = info?.ratings?.aggregatedRating?.rating || "N/A";
          const ratingCount =
            info?.ratings?.aggregatedRating?.ratingCountV2 || "0";
          const price = info?.price || info?.defaultPrice;
          const finalPrice = info?.finalPrice;
          const imageUrl = info?.imageId
            ? `${CDN_URL}${info.imageId}`
            : "/placeholder.png";

          return (
            <div
              key={info?.id}
              className="w-full md:w-3/4 lg:w-1/2 m-auto my-2 mb-3 py-2 border-b border-gray-700 flex flex-col md:flex-row justify-between items-center"
            >
              {/* Left Side - Name, Price, Ratings */}
              <div className="w-full md:w-3/4">
                <div className="flex items-center gap-2">
                <div className={`border ${isVeg ? "border-green-500" : "border-red-500"} rounded w-4 h-4 flex items-center justify-center`}>
                  <div
                    className={`w-2 h-2 rounded-full border ${
                      isVeg
                        ? "bg-green-500 border-green-500"
                        : "bg-red-500 border-red-500"
                    }`}
                  ></div> 
                  </div>
                  {isBestseller && (
                    <span className="ml-1 text-orange-400 text-xs font-bold px-2 py-1 rounded">
                      Bestseller
                    </span>
                  )}
                </div>

                <span className="block text-lg font-semibold">
                  {info?.name}
                </span>

                <div className="mt-2">
                  {finalPrice ? (
                    <>
                      <span className="text-gray-500 line-through mr-2">
                        ₹{price / 100}
                      </span>
                      <span className="text-gray-300">₹{finalPrice / 100}</span>

                    </>
                  ) : (
                    <span className="text-gray-300">₹{price / 100}</span> 
                  )}
                </div>

                {ratingCount > 0 && (
                  <div className="flex items-center gap-1 text-sm font-bold mt-2 text-yellow-400">
                    ★ {rating} <span className="text-gray-400">({ratingCount})</span>
                  </div>
                )}
              </div>

              {/* Right Side - Image & Remove Button */}
              <div className="w-full md:w-1/4 mb-4 relative flex justify-center">
      {imageUrl && (
        <img
          src={imageUrl}
          className="w-36 h-28 object-cover rounded-lg shadow-md"
          onError={(e) => e.target.style.display = "none"} 
        />
      )}
  <AddRemoveButton item={item} onAdd={() => handleAddItem(item)} />
</div>  
            </div>
          );
        }) 
      )}
    </div>
    </div>
  );
};

export default Cart;
