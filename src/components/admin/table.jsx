import React from 'react';
import { Link } from "react-router-dom";
import "../../Styles/admin/table.css";

const Table = ({ orders = [] }) => {  // Default to an empty array if orders is undefined

    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th>Order ID</th>
                        <th>Amount</th>
                        <th>Quantity</th>
                        <th>Discount</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.length > 0 ? (
                        orders.map(order => (
                            <tr key={order._id}>
                                <td>{order._id}</td>
                                <td>₹{order.amount || 'N/A'}</td>
                                <td>{order.quantity || 'N/A'}</td>
                                <td>₹{order.discount || 'N/A'}</td>
                                <td>{order.status || 'N/A'}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="5">No orders available</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}

export default Table;
