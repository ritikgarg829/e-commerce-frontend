import React, { useState, useEffect } from 'react';
import AdminSidebar from '../../../components/admin/adminSidebar';
import { Link, useParams, useNavigate } from 'react-router-dom';
import '../../../Styles/admin/management/transectionManagement.css';
import { useSelector } from "react-redux"
import { server } from "../../../redux/store.js"
import { toast } from "react-hot-toast"
import { FaTrash } from "react-icons/fa"

import { useSingleOrderQuery, useDeleteOrderMutation, useUpdateOrderMutation } from '../../../redux/api/order-api.js';

const TransactionManagement = () => {
    const navigate = useNavigate();
    const params = useParams();

    const { user: users } = useSelector((state) => state.userReducer);
    const { data, isError, error } = useSingleOrderQuery(params.id);
    const [updateProducts] = useUpdateOrderMutation();
    const [deleteProduct] = useDeleteOrderMutation();

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



    const updateHander = async () => {
        //example:  setOrder((prev) => ({
        //     ...prev,
        //     status: prev.status === "Processing" ? "Shipped" : "Delivered",
        // }));

        try {
            const res = await updateProducts({ userid: users?._id, orderid: params.id }); // Ensure the correct parameter name is passed

            if ("data" in res) {
                toast.success("product updated successfully");

            } else {
                const error = res.error;
                const message = (error.data).message;
                toast.error(message)
            }


        } catch (error) {
            // Handle error
            console.error("Error updating product:", error);
        }


    };


    const deleteHandler = async () => {
        try {
            const res = await deleteProduct({ userid: users?._id, orderid: params.id }); // Ensure the correct parameter name is passed

            if ("data" in res) {
                toast.success("product deleted successfully");

            } else {
                const error = res.error;
                const message = (error.data).message;
                toast.error(message)
            }


        } catch (error) {
            // Handle error
            console.error("Error updating product:", error);
        }

        navigate('/admin/transection')


    }

    return (
        <div className="admin-container">
            <AdminSidebar />
            <main className="product-management">
                <section
                    style={{
                        padding: "2rem",
                    }}
                >
                    <h2 className="text-center">Order Items</h2>

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

                <button className="transection-delete-btn" onClick={deleteHandler}>
                    <FaTrash />
                </button>

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

                    <button className="update" onClick={updateHander}>Process Status</button>
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

export default TransactionManagement;