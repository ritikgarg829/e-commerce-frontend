import { Elements, PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useState } from "react";
import "../Styles/checkout.css";
import { useLocation, useNavigate, Navigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useNewOrderMutation } from "../redux/api/order-api";
import { resetcart } from "../redux/reducer/cartReducer";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PROMISE_PUBLICKEY);

const responseToast = (response, navigate, successRedirect) => {
    if (response.error) {
        toast.error(response.error.data.message || "Something went wrong");
    } else {
        toast.success("Order placed successfully");
        navigate(successRedirect);
    }
};

const CheckOutForm = () => {
    const stripe = useStripe();
    const elements = useElements();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { user } = useSelector((state) => state.userReducer);
    const {
        cartItems,
        subtotal,
        tax,
        shippingCharges,
        discount,
        total,
        shippingInfo,
    } = useSelector((state) => state.cartReducer);

    const [newOrder] = useNewOrderMutation();
    const [isProcessing, setIsProcessing] = useState(false);

    const location = useLocation();
    const clientSecret = location.state;

    const submitHandler = async (e) => {
        e.preventDefault();

        if (!stripe || !elements || !clientSecret) return;
        setIsProcessing(true);

        const mappedOrderItems = cartItems.map(item => ({
            productId: item.productid,
            name: item.name,
            price: item.price,
            photo: item.photo,
            quantity: item.quantity
            // Exclude 'stock' field if it exists in cartItems
        }));

        const orderData = {
            orderItems: mappedOrderItems,
            subtotal,
            tax,
            shippingCharges,
            discount,
            total,
            shippingInfo,
            user: user?._id,
        };

        const { error } = await stripe.confirmPayment({
            elements,
            confirmParams: {
                return_url: window.location.origin,
                payment_method_data: {
                    billing_details: {
                        name: user.name,
                        email: user.email,
                        address: {
                            line1: shippingInfo.address,
                            city: shippingInfo.city,
                            state: shippingInfo.state,
                            postal_code: shippingInfo.pincode,
                            country: shippingInfo.country,
                        },
                    },
                },
            },
            redirect: "if_required",
        });

        if (error) {
            setIsProcessing(false);
            return toast.error(error.message || "Something went wrong");
        }

        const { paymentIntent } = await stripe.retrievePaymentIntent(clientSecret);

        if (paymentIntent.status === "succeeded") {
            const res = await newOrder(orderData);
            console.log("error", res);
            dispatch(resetcart());
            responseToast(res, navigate, "/orders");
        }
        setIsProcessing(false);
    };

    if (!clientSecret) return <Navigate to={"/shipping"} />;

    return (
        <div className="checkout-container">
            <form onSubmit={submitHandler}>
                <PaymentElement />
                <button type="submit" disabled={isProcessing}>
                    {isProcessing ? "Processing" : "Pay"}
                </button>
            </form>
        </div>
    );
};

const Checkout = () => {
    const location = useLocation();
    const clientSecret = location.state;

    if (!clientSecret) return <Navigate to={"/shipping"} />;

    return (
        <Elements options={{ clientSecret }} stripe={stripePromise}>
            <CheckOutForm />
        </Elements>
    );
};

export default Checkout;
