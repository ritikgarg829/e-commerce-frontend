import React, { useState, useEffect } from 'react';
import { BiArrowBack } from "react-icons/bi";
import "../Styles/shipping.css";
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import axios from 'axios';
import { server } from "../redux/store.js";
import { saveShippingInfo } from "../redux/reducer/cartReducer.js";
import { toast } from "react-hot-toast";

const Shipping = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { cartItems, total } = useSelector((state) => state.cartReducer);
    const { user } = useSelector((state) => state.userReducer);

    const [shippingInfo, setShippingInfo] = useState({
        address: "",
        state: "",
        city: "",
        country: "",
        pincode: ""
    });

    const submitHandler = async (e) => {
        e.preventDefault();

        dispatch(saveShippingInfo(shippingInfo));

        try {
            const { data } = await axios.post(`${server}/api/v1/payment/create`, {
                amount: total,
                description: "Order payment for e-commerce site",
                customerDetails: {
                    name: user.name,
                    address: {
                        line1: shippingInfo.address,
                        city: shippingInfo.city,
                        state: shippingInfo.state,
                        postal_code: shippingInfo.pincode,
                        country: shippingInfo.country,
                    }
                }
            }, {
                headers: {
                    "Content-Type": "application/json"
                },
            });

            navigate("/pay", {
                state: data.clientSecret
            });

        } catch (error) {
            console.error("Error:", error);
            toast.error("Something Went Wrong");
        }
    };

    const changeHandler = (e) => {
        setShippingInfo((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    useEffect(() => {
        if (cartItems.length === 0) {
            navigate('/cart');
        }
    }, [cartItems, navigate]);

    return (
        <div className="shipping">
            <button className="back-btn" onClick={() => navigate("/cart")}><BiArrowBack /></button>
            <form onSubmit={submitHandler}>
                <h2 className="shipping-heading">Shipping Address</h2>
                <input type="text" placeholder='Address' name="address" required
                    value={shippingInfo.address}
                    onChange={changeHandler} />

                <input type="text" placeholder='State' name="state" required
                    value={shippingInfo.state}
                    onChange={changeHandler} />

                <input type="text" placeholder='City' name="city" required
                    value={shippingInfo.city}
                    onChange={changeHandler} />

                <select name="country" required value={shippingInfo.country}
                    onChange={changeHandler}>
                    <option value="">Select Country</option>
                    <option value="India">India</option>
                </select>

                <input type="text" placeholder='Pincode' name="pincode" required
                    value={shippingInfo.pincode}
                    onChange={changeHandler} />
                <button className="paynow" type="submit">Pay Now</button>
            </form>
        </div>
    );
};

export default Shipping;
