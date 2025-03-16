import React, { useState, useContext } from "react";
import { useParams } from "react-router";
import Shimmer from "./Shimmer";
import useResTrauntMenu from "../utils/useRestaurantMenu";
import RestaurantCategory from "./RestaurantCategory";
import DarkModeContext from "../utils/darkModeContext";

const RestaurantMenu = () => {
  const { darkMode } = useContext(DarkModeContext); // Dark Mode
  const [openCategoryIndex, setOpenCategoryIndex] = useState(0);
  const { resId } = useParams();
  const resInfo = useResTrauntMenu(resId);
  const [copiedCoupon, setCopiedCoupon] = useState("");

  if (!resInfo) return <Shimmer />;

  // ✅ Extract Menu Items & Offers
  const itemCards =
    resInfo?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards[1]?.card?.card
      ?.itemCards || [];
  const offers =
    resInfo?.cards[3]?.card?.card?.gridElements?.infoWithStyle?.offers || [];
  const { name, cuisines, costForTwoMessage } =
    resInfo?.cards[2]?.card?.card?.info || {};

  // ✅ Extract Categories
  const categories = [];
  resInfo?.cards.forEach((card) => {
    const categoryCards = card?.groupedCard?.cardGroupMap?.REGULAR?.cards.filter(
      (c) =>
        c?.card?.card?.["@type"] ===
        "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory"
    );
    if (categoryCards && categoryCards.length > 0) {
      categories.push(...categoryCards);
    }
  });

  // ✅ Function to handle coupon copy
  const handleCopyCoupon = (couponCode) => {
    navigator.clipboard.writeText(couponCode);
    setCopiedCoupon(couponCode);
    setTimeout(() => setCopiedCoupon(""), 2000);
  };

  return (
    <div
      className={`w-full  mx-auto p-4 sm:p-6 ${
        darkMode ? "bg-black text-white" : "bg-white text-gray-900"
      }`}
    >
      {/* Header */}
      <div className="text-center mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold">{name}</h1>
        <h3 className="text-gray-600 dark:text-gray-400">
          {cuisines?.join(", ")}
        </h3>
        <h3 className="text-lg font-semibold mt-2">{costForTwoMessage}</h3>
      </div>

      {/* Categories */}
      {categories?.map((category, idx) => (
        <RestaurantCategory
          key={idx}
          data={category?.card?.card}
          show={openCategoryIndex === idx}
          setShow={() =>
            setOpenCategoryIndex(openCategoryIndex === idx ? null : idx)
          }
        />
      ))}
    </div>
  );
};

export default RestaurantMenu;
