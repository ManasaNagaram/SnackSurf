import { configureStore, createSlice } from "@reduxjs/toolkit";
import CartReducer from "./cartSlice";
const appStore = configureStore({
    reducer:{
        cart:CartReducer

    }
});
export default appStore;