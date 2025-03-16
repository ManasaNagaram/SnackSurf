import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: "cart",
    initialState: {
        items: []
    },
    reducers: {
        addItem: (state, action) => {
            const existingItem = state.items.find(
                (item) => item.card.info.id === action.payload.card.info.id
            );
            if (existingItem) {
                existingItem.quantity += 1;  // Increase quantity instead of adding duplicate
            } else {
                state.items.push({ ...action.payload, quantity: 1 });
            }
        },
        removeItem: (state, action) => {
            const index = state.items.findIndex(
                (item) => item.card.info.id === action.payload.card.info.id
            );
            if (index !== -1) {
                if (state.items[index].quantity > 1) {
                    state.items[index].quantity -= 1;  // Decrease quantity
                } else {
                    state.items.splice(index, 1);  // Remove if quantity becomes 0
                }
            }
        },
        clearCart: (state) => {
            state.items = [];
        },
        isIncluded: (state, action) => {
            return state.items.some((item) => item.card.info.id === action.payload.card.info.id);
        }
    }
});

export const { addItem, removeItem, clearCart, isIncluded } = cartSlice.actions;
export default cartSlice.reducer;
