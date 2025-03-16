import React, { useContext } from "react";
import DarkModeContext from "../utils/darkModeContext";

const Shimmer = () => {
  const { darkMode } = useContext(DarkModeContext);

  return (
    <div className= {`${darkMode ? "bg-black" : "bg-white"} grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6`}>
      {Array(6) // Creates 6 shimmer cards dynamically
        .fill("")
        .map((_, index) => (
          <div
            key={index}
            className={`p-4 rounded-lg shadow-lg  ${darkMode ? "bg-black" : "bg-white"}`}
          >
            {/* Shimmer Image */}
            <div className={`w-3/4 h-40 rounded-md mb-4 ${darkMode ? "bg-gray-800" : "bg-gray-300"}`}></div>

            {/* Shimmer Text Content */}
            <div className="flex flex-col gap-3">
              <div className={`h-5 rounded w-3/4 ${darkMode ? "bg-gray-800" : "bg-gray-300"}`}></div> {/* Title */}
              <div className={`h-4 rounded w-3/4 ${darkMode ? "bg-gray-800" : "bg-gray-300"}`}></div> {/* Description */}
              <div className={`h-4 rounded w-1/3 ${darkMode ? "bg-gray-800" : "bg-gray-300"}`}></div> {/* Price */}
            </div>
          </div>
        ))}
    </div>
  );
};

export default Shimmer;
