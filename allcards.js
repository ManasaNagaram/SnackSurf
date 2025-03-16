{
    allCards.map((i, idx) => (
      <div key={idx}> {/* Use idx as key for top-level elements */}
        <h1>{i?.title}</h1>
  
        {/* Checking if categories exist */}
        {i?.card?.card?.categories?.map((category, catIdx) => (
          <div key={`category-${idx}-${catIdx}`}>
            <h1>{category?.title}</h1>
  
            {/* Ensure category.itemCards is an array */}
            {Array.isArray(category?.itemCards) &&
              category.itemCards.map((items, itemIdx) => (
                // Ensure items is an array before using map
                Array.isArray(items) &&
                items.map((item, innerIdx) => {
                  const info = item?.card?.info;
                  if (!info) return null;
  
                  const { description, imageId, itemAttribute, name, price } = info;
                  const vegClassifier = itemAttribute?.vegClassifier; // Safe extraction
  
                  return (
                    <div key={`item-${idx}-${catIdx}-${itemIdx}-${innerIdx}`}>
                      <h2>Description: {description}</h2>
                      <h3>Name: {name}</h3>
                      <h3>Price: {price}</h3>
                    </div>
                  );
                })
              ))
            }
          </div>
        ))}
  
        {/* Checking if itemCards exist */}
        {Array.isArray(i?.card?.card?.itemCards) &&
          i.card.card.itemCards.map((items, itemIdx) => (
            // Ensure items is an array before using map
            Array.isArray(items) &&
            items.map((item, innerIdx) => {
              const info = item?.card?.info;
              if (!info) return null;
  
              const { description, imageId, itemAttribute, name, price } = info;
              const vegClassifier = itemAttribute?.vegClassifier; // Safe extraction
  
              return (
                <div key={`itemcard-${idx}-${itemIdx}-${innerIdx}`}>
                  <h2>Description: {description}</h2>
                  <h3>Name: {name}</h3>
                  <h3>Price: {price}</h3>
                </div>
              );
            })
          ))
        }
      </div>
    ))
  }
  // const FriendsAndFamilyCombo =
  //   resInfo?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards[12]?.card?.card?.itemCards;


    {/* <div className="friends and family">
        <h1>{FriendsAndFamilyCombo.title}</h1>
        {FriendsAndFamilyCombo.categories.map((category)=>{
          <h1>{category.title}</h1>
            category.itemCards.map((items)=>{
              items.map((item)=>{
                const info= item.card.info
                const { description, imageId, itemAttribute: { vegClassifier }, name, price } = info;
              })
            }

            )
        })}
      </div> */}


            {/* ✅ Offers Section */}
            {offers.length > 0 && (
              <div className="mt-6 bg-gray-100 p-4 rounded-lg shadow-md">
                <h3 className="text-lg font-bold mb-3">🎉 Special Offers</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {offers.map((offer, index) => {
                    const { header, description, couponCode, expiryTime, offerTag } =
                      offer?.info || {};
                    const isDealOfTheDay = offerTag === "DEAL OF DAY";
      
                    return (
                      <div
                        key={index}
                        className={`p-4 rounded-lg flex flex-col shadow-sm ${
                          isDealOfTheDay
                            ? "bg-orange-100 border-l-4 border-orange-500"
                            : "bg-white border-l-4 border-green-500"
                        }`}
                      >
                        <h4 className="text-md font-bold text-gray-900">
                          {header || "Special Offer"}
                        </h4>
                        <p className="text-sm text-gray-600">
                          {description.includes("ON SELECT")
                            ? "ON SELECTED ITEMS"
                            : description || "Exclusive deal available"}
                        </p>
      
                        {/* ✅ Coupon Code */}
                        {couponCode && (
                          <div className="mt-2 flex items-center gap-2 px-3 py-1 bg-gray-200 text-gray-800 font-semibold rounded-md text-sm">
                            <span>🔖 {couponCode}</span>
                            <button
                              className="ml-auto text-blue-600 hover:text-blue-800 font-bold"
                              onClick={() => handleCopyCoupon(couponCode)}
                            >
                              COPY
                            </button>
                          </div>
                        )}
      
                        {/* ✅ Copy Success Message */}
                        {copiedCoupon === couponCode && (
                          <p className="text-green-400 text-sm mt-1 font-medium">
                            Coupon copied!
                          </p>
                        )}
      
                        {/* ✅ Highlight "Deal of the Day" */}
                        {isDealOfTheDay && (
                          <span className="mt-2 text-xs font-bold text-orange-600">
                            🔥 Limited Time Deal
                          </span>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
      
            {/* ✅ Menu Items */}
            {itemCards.length > 0 && (
              <div className="mt-6">
                <h3 className="text-lg font-bold mb-3">🍽️ Menu</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {itemCards.map((item, index) => {
                    const { name, description, price, imageId } =
                      item?.card?.info || {};
      
                    return (
                      <div
                        key={index}
                        className="flex items-center gap-4 p-4 bg-white shadow-md rounded-lg"
                      >
                        {imageId && (
                          <img
                            src={CDN_URL + imageId}
                            alt={name}
                            className="w-20 h-20 object-cover rounded-md"
                          />
                        )}
                        <div>
                          <h4 className="text-md font-semibold">{name}</h4>
                          <p className="text-sm text-gray-600">{description}</p>
                          <p className="text-sm font-medium">
                            ₹{(price / 100).toFixed(2)}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
// import React, { useState } from "react";
// import { useParams } from "react-router";
// import Shimmer from "./Shimmer";
// import useResTrauntMenu from "../utils/useRestaurantMenu";
// import { CDN_URL } from "../utils/constants";
// import RestaurantCategory from "./RestaurantCategory";

// const RestaurantMenu = () => {
//   const { resId } = useParams();
//   const resInfo = useResTrauntMenu(resId);
//   const [copiedCoupon, setCopiedCoupon] = useState("");

//   if (!resInfo) return <Shimmer />;
  

//   const itemCards =
//     resInfo?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards[1]?.card?.card
//       ?.itemCards || [];
//   const offers =
//     resInfo?.cards[3]?.card?.card?.gridElements?.infoWithStyle?.offers || [];
//   const { name, cuisines, costForTwoMessage } =
//     resInfo?.cards[2]?.card?.card?.info || {};
//     // console.log(resInfo);
//     const categories ={};
// resInfo?.cards.forEach(card,idx => {
//   if(card.groupedCard?.cardGroupMap?.REGULAR?.cards.filter(c=>c?.card?.card?.["@type"]=="type.googleapis.com/swiggy.presentation.food.v2.ItemCategory")){
//     categories = card.groupedCard?.cardGroupMap?.REGULAR?.cards.filter(c=>c?.card?.card?.["@type"]=="type.googleapis.com/swiggy.presentation.food.v2.ItemCategory");
//   }
// })
//   console.log(categories);
//   // ✅ Function to handle coupon copy
//   const handleCopyCoupon = (couponCode) => {
//     navigator.clipboard.writeText(couponCode);
//     setCopiedCoupon(couponCode);
//     setTimeout(() => setCopiedCoupon(""), 2000);
//   };

//   return (
//     <div className="max-w-4xl mx-auto p-6">
//       <div className="text-center mb-6">
//         <h1 className="text-3xl font-bold">{name}</h1>
//         <h3 className="text-gray-600">{cuisines?.join(", ")}</h3>
//         <h3 className="text-lg font-semibold mt-2">{costForTwoMessage}</h3>
//       </div>
//       {categories?.map((category, idx) => {
//         return (
//           <RestaurantCategory key={idx} props={category?.card?.card} />
//         );
//       })}
//     </div>
//   );
// };

// export default RestaurantMenu;