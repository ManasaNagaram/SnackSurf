import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import { cors_API } from '../utils/constants';
const ItemDetails = () => {
  const { id } = useParams();  // Get the item ID from the URL
  const [itemData, setItemData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch item details when the component mounts or when the ID changes
  useEffect(() => {
    const fetchItemDetails = async () => {
      try {
        setLoading(true);
        const response = await fetch(cors_API+`https://www.swiggy.com/dapi/restaurants/list/v5?lat=17.406498&lng=78.47724389999999&collection={id}&tags=&sortBy=&filters=&type=rcv2&offset=0&page_type=null`);
        if (!response.ok) {
          throw new Error('Item not found');
        }
        const data = await response.json();
        setItemData(data);  // Set the item details to state
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchItemDetails();
  }, [id]);  // Re-run the fetch when the id changes

  // If loading, show a loading message
  if (loading) {
    return <div>Loading...</div>;
  }

  // If there's an error, show the error message
  if (error) {
    return <div>Error: {error}</div>;
  }

  // If item data is available, render it
  return (
    <div>
      <h1>Item Details for {id}</h1>
      {console.log(itemData)}
      {itemData && (
        <div>
          <h2>{itemData.name}</h2>
          <p>{itemData.description}</p>
          <img src={itemData.imageUrl} alt={itemData.name} />
          {/* Display more item details as needed */}
        </div>
      )}
    </div>
  );
};

export default ItemDetails;
