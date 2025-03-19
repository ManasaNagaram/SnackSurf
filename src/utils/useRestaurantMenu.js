import { useEffect, useState } from "react";
import { MENU_API, cors_API } from "./constants"; 

const useRestaurantMenu = (resId) => {
  const [resInfo, setResInfo] = useState(null);

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const response = await fetch(`${cors_API}?url=${encodeURIComponent(MENU_API + resId)}`);
        if (!response.ok) {
          throw new Error("Failed to fetch menu");
        }
        const json = await response.json();
        setResInfo(json?.data);
      } catch (error) {
        console.error("Error fetching menu:", error);
      }
    };

    if (resId) fetchMenu();
  }, [resId]);

  return resInfo;
};

export default useRestaurantMenu;
