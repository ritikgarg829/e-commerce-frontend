import { configureStore } from "@reduxjs/toolkit";
import { userAPI } from "./api/user-api.js"
import { userReducer } from "./reducer/userReducer.js";
import { productAPI } from "./api/product-api.js";
import { cartReducer } from "./reducer/cartReducer.js";
import { orderApi } from "../redux/api/order-api.js"
import { dashboardApi } from "../redux/api/dashboard-api.js"
import { couponApi } from "../redux/api/coupon-api.js"

export const server = import.meta.env.VITE_SERVER;

export const store = configureStore({
    reducer: {
        [userAPI.reducerPath]: userAPI.reducer,
        [userReducer.name]: userReducer.reducer,
        [cartReducer.name]: cartReducer.reducer,
        [productAPI.reducerPath]: productAPI.reducer,
        [orderApi.reducerPath]: orderApi.reducer,
        [dashboardApi.reducerPath]: dashboardApi.reducer,
        [couponApi.reducerPath]: couponApi.reducer,

    },

    middleware: (mid) => [...mid(), userAPI.middleware, productAPI.middleware, orderApi.middleware, dashboardApi.middleware, couponApi.middleware],

});






