import React, { useState, useEffect } from 'react';
import AdminSidebar from '../../components/admin/adminSidebar';
import { Link } from "react-router-dom";
import "../../Styles/admin/transection.css";
import { useAllOrderQuery } from "../../redux/api/order-api";
import { useSelector } from "react-redux";

const transection = () => {
    const { user } = useSelector(state => state.userReducer);

    const { data, isLoading, isError } = useAllOrderQuery(user?._id);

    if (isError) Toast.error(isError.data.message);

    const [orderData, setorderData] = useState([]);

    console.log("data is", data)

    useEffect(() => {
        if (data) {
            setorderData(data.orders);
            console.log("my data is", orderData)
        }
    }, [data]);

    if (isError) {
        Toast.error(isError.data.message);
    }

    return (
        <div className="adminContainer-transection">
            <AdminSidebar />
            <main>
                <div className="container">
                    <div className="order-view">
                        <h1 className="all-transection text-center">All - transections</h1>
                        <div className="main">
                            <table>
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Amount</th>
                                        <th>Quantity</th>
                                        <th>Discount</th>
                                        <th>Status</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {orderData && orderData.map(transection => (
                                        <tr key={transection._id}>
                                            <td>{transection._id}</td>
                                            <td>{transection.total}</td>
                                            <td>{transection.orderItems.map(item => item.quantity).reduce((a, b) => a + b, 0)}
                                            </td>
                                            <td>{transection.discount}</td>
                                            <td>{transection.status}</td>
                                            <td>
                                                <Link className="view" to={`/admin/management/managetransections/${transection._id}`}>Manage</Link>

                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
};

export default transection;