import { useEffect, useState } from "react";

const useOnlineStatus = () => {
  const [status, setStatus] = useState(navigator.onLine); // Initial status is based on navigator.onLine

  useEffect(() => {
    const handleOnline = () => {
      setStatus(true); 
    };

    const handleOffline = () => {
      setStatus(false); 
    };

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    // Cleanup event listeners on component unmount
    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  return status;
};

export default useOnlineStatus;
