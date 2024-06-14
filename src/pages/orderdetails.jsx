import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import '../Styles/orderdetails.css';
import { useSelector } from "react-redux"
import { server } from "../redux/store.js"
import { toast } from "react-hot-toast"
import { FaTrash } from "react-icons/fa"
import { useSingleOrderQuery } from '../redux/api/order-api.js';

const orderdetails = () => {
    const navigate = useNavigate();
    const params = useParams();

    const { user: users } = useSelector((state) => state.userReducer);
    const { data, isError, error } = useSingleOrderQuery(params.id);


    if (!data) {
        return <div>Loading...</div>;
    }

    console.log("data is ", data)

    const {
        order: {
            shippingInfo: { address, city, state, country, pincode },
            _id,
            user: { name },
            subtotal,
            tax,
            shippingcharges,
            discount,
            total,
            status,
            orderItems,
        },
    } = data;

    return (
        <div className="admin-container">
            <main className="product-management">
                <section
                    style={{
                        padding: "2rem",
                    }}
                >
                    {orderItems.map((i) => (
                        <ProductCard
                            key={i._id}
                            name={i.name}
                            photo={i.photo}
                            _id={i._id}
                            quantity={i.quantity}
                            price={i.price}
                        />
                    ))}
                </section>
                <article className="shipping-info-card">
                    <h1 className="text-lg font-medium text-center">Order Info</h1>
                    <h5>User Info</h5>
                    <p>Name: {name}</p>
                    <p>
                        Address: {`${address}, ${city}, ${state}, ${country} ${pincode}`}
                    </p>

                    <h5>Amount Info</h5>
                    <p>Subtotal: {subtotal}</p>
                    <p>Shipping Charges: {shippingcharges}</p>
                    <p>Tax: {tax}</p>
                    <p>Discount: {discount}</p>
                    <p>Total: {total}</p>

                    <h5>Status Info</h5>
                    <p>
                        Status:{" "}
                        <span
                            className={
                                status === "Delivered"
                                    ? "text-purple-500"
                                    : status === "Shipped"
                                        ? "text-green-500"
                                        : "text-red-500"
                            }
                        >
                            {status}
                        </span>
                    </p>
                </article>
            </main>
        </div>
    );
};

const ProductCard = ({ name, photo, price, quantity, _id }) => (
    <div className="transaction-product-card">
        <img src={`${server}/${photo}`} alt={name} />
        <Link to={`/product/${_id}`}>{name}</Link>
        <span>
            ${price} X {quantity} = ${price * quantity}
        </span>
    </div>
);

export default orderdetails;