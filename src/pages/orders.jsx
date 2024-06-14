import React, { useState, useEffect } from 'react'
import "../Styles/orders.css"
import { Link } from "react-router-dom"
import { useMyOrderQuery } from "../redux/api/order-api.js";
import { useSelector } from 'react-redux';
import toast from "react-hot-toast"

const orders = () => {

    // const orders = [
    //     { id: "ded", amount: 100, quantity: 2, discount: 10, status: <span className="text-red-600">Processing</span>, action: <Link to={'/order/ded'}>View</Link> },
    //     { id: "ded", amount: 100, quantity: 2, discount: 10, status: <span className="text-red-600">Processing</span>, action: <Link to={'/order/ded'}>View</Link> },
    //     { id: "ded", amount: 100, quantity: 2, discount: 10, status: <span className="text-red-600">Processing</span>, action: <Link to={'/order/ded'}>View</Link> },
    //     { id: "ded", amount: 100, quantity: 2, discount: 10, status: <span className="text-red-600">Processing</span>, action: <Link to={'/order/ded'}>View</Link> },
    //     { id: "ded", amount: 100, quantity: 2, discount: 10, status: <span className="text-red-600">Processing</span>, action: <Link to={'/order/ded'}>View</Link> },

    // ];

    const { user } = useSelector((state) => state.userReducer);
    const [orders, Setorders] = useState([])

    const { data, isLoading, Error, isError } = useMyOrderQuery(user?._id);

    if (isError) toast.error(isError.data.message);


    useEffect(() => {
        if (data) {
            Setorders(data.orders)
        }

        if (isError) {
            Toast.error(isError.data.message);
        }

    }, [data])


    return (
        <div className="container">
            <h1>My Orders</h1>
            <div className="order-view">
                <h1 className="text-center">Orders</h1>
                <div className="main">
                    <table>
                        <thead>
                            <tr>
                                <th>Order ID</th>
                                <th>Amount</th>
                                <th>Quantity</th>
                                <th>Discount</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map(order => (
                                <tr key={order._id}>
                                    <td>{order._id}</td>
                                    <td>₹{order.total}</td>
                                    <td>{order.orderItems.map(item => item.quantity).reduce((a, b) => a + b, 0)}</td>
                                    <td>₹{order.discount}</td>
                                    <td>{order.status}</td>
                                    <td>
                                        <Link className="view" to={`/ordersdetails/${order._id}`}>View</Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default orders
