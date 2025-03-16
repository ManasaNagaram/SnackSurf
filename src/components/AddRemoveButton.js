import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { addItem, removeItem } from "../utils/cartSlice";

const AddRemoveButton = ({ item }) => {
    const quantity = useSelector((state) =>
        state.cart.items.find(cartItem => cartItem.card.info.id === item.card.info.id)?.quantity || 0
    );

    const dispatch = useDispatch();

    const handleRemoveItem = () => {
        if (quantity > 0) {
            dispatch(removeItem(item));
        }
    };
    const handleAddItem = () => {
        dispatch(addItem(item));
    };

    return (
        <div className="w-28 cursor-pointer absolute bottom-0 translate-y-1/2 left-1/2 transform -translate-x-1/2 bg-white text-green-800 font-semibold hover:bg-gray-200 border border-gray-200 rounded-lg py-2 shadow-md flex items-center justify-center">
            {quantity !== 0 ? (
                <div className="flex items-center  space-x-2">
                    <button
                        className="text-green-800  cursor-pointer font-semibold hover:bg-gray-200 px-2  rounded"
                        onClick={handleRemoveItem}
                    >
                        -
                    </button>
                    <span className="text-green-800 font-semibold">{quantity}</span>
                    <button
                        className="text-green-800 cursor-pointer font-semibold hover:bg-gray-200 px-2  rounded"
                        onClick={handleAddItem}
                    >
                        +
                    </button>
                </div>
            ) : (
                <button
                    className="w-full cursor-pointer"
                    onClick={handleAddItem}
                >
                    ADD
                </button>
            )}
        </div>
    );
    
};

export default AddRemoveButton;
