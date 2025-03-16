import React, { useContext } from "react";
import ItemList from "./ItemList";
import DarkModeContext from "../utils/darkModeContext";

const RestaurantCategory = ({ data, show, setShow }) => {
  const { darkMode } = useContext(DarkModeContext); // Dark mode state

  return (
    <div className="w-3/4 px-4 mb-2 m-auto sm:px-6 md:px-8 lg:px-10">
      <div
        className={`shadow-md hover:shadow-lg transition-shadow px-4 rounded-xs sm:px-6 py-3 my-4 cursor-pointer 
          ${darkMode ? "bg-black shadow-gray-600 text-white" : "bg-gray-50"}`}
      >
        <div
          className="flex justify-between items-center font-semibold text-base sm:text-lg"
          onClick={setShow}
        >
          <span>
            {data?.title} <span>({data?.itemCards?.length || 0})</span>
          </span>
          <span className="text-xs sm:text-sm">{show ? "▲" : "▼"}</span>
        </div>

        {show && <ItemList items={data.itemCards} />}
      </div>
    </div>
  );
};

export default RestaurantCategory;
