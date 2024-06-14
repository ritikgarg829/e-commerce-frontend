import { createSlice } from "@reduxjs/toolkit";

const loadInitialState = () => {
    const initialState = {
        loading: false,
        cartItems: [],
        subtotal: 0,
        tax: 0,
        shippingCharges: 0,
        discount: 0,
        total: 0,
        shippingInfo: {
            address: "",
            city: "",
            state: "",
            country: "",
            pincode: "",
        },
    };

    try {
        const serializedState = localStorage.getItem("cartItems");
        if (serializedState !== null) {
            initialState.cartItems = JSON.parse(serializedState);
        }
    } catch (err) {
        console.error("Error loading cart items from localStorage:", err);
    }

    return initialState;
};


export const cartReducer = createSlice({
    name: "cartReducer",
    initialState: loadInitialState(),
    reducers: {
        addTocart: (state, action) => {
            state.loading = true;

            const index = state.cartItems.findIndex((i) => i.productid === action.payload.productid);
            if (index !== -1) {
                state.cartItems[index] = action.payload;
            } else {
                state.cartItems.push(action.payload);
            }

            state.loading = false;
            // Update localStorage
            localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
        },

        removeFromCart: (state, action) => {
            state.loading = true;
            state.cartItems = state.cartItems.filter((i) => i.productid !== action.payload);
            state.loading = false;
            // Update localStorage
            localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
        },

        calculatePrice: (state) => {
            const subtotal = state.cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

            state.subtotal = subtotal;
            state.shippingCharges = state.subtotal > 1000 ? 100 : 250;
            state.tax = Math.round(state.subtotal * 0.18);
            state.total = state.subtotal + state.tax + state.shippingCharges - state.discount;
        },

        discountApplied: (state, action) => {
            state.discount = action.payload;
        },

        saveShippingInfo: (state, action) => {
            state.shippingInfo = action.payload;
        },

        resetcart: () => loadInitialState(),
    },
});

export const { addTocart, removeFromCart, calculatePrice, discountApplied, saveShippingInfo, resetcart } = cartReducer.actions;

export default cartReducer.reducer;
