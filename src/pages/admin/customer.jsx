import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import AdminSidebar from '../../components/admin/adminSidebar';
import { toast } from "react-hot-toast";
import "../../Styles/admin/customer.css";
import { MdDelete } from "react-icons/md";
import { useAllUsersQuery, useDeleteUserMutation } from "../../redux/api/user-api.js";
import avatar from "../../assets/images/avatar.png";

const Customer = () => {
    const { user } = useSelector((state) => state.userReducer);
    const { data, isLoading, isError } = useAllUsersQuery(user?._id);
    const [deleteUsers] = useDeleteUserMutation(user?._id);
    const [customerData, setCustomerData] = useState([]);

    if (isError) {
        toast.error(isError.data.message);
    }

    useEffect(() => {
        if (data) {
            setCustomerData(data.users);
        }
    }, [data]);


    const onHandleDelete = async (userId) => {
        const res = await deleteUsers({ userid: userId, adminUserId: user?._id });

        if ("data" in res) {
            toast.success("Customer deleted successfully");
            setCustomerData(prev => prev.filter(customer => customer._id !== userId));
        } else {
            const error = res.error;
            const message = error.data.message;
            toast.error(message);
        }
    };

    return (
        <div className="adminContainer-customer">
            <AdminSidebar />
            <main>
                <div className="container">
                    <div className="order-view">
                        <h1 className="all-customer text-center">All - Customers</h1>
                        <div className="main">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Avatar</th>
                                        <th>Name</th>
                                        <th>Gender</th>
                                        <th>Email</th>
                                        <th>Role</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {customerData && customerData.map(customer => (
                                        <tr key={customer._id}>
                                            <td><img src={avatar} alt={customer.name} style={{ width: '50px', height: '50px', objectFit: 'cover', borderRadius: "50%" }} /></td>
                                            <td>{customer.name}</td>
                                            <td>{customer.gender}</td>
                                            <td>{customer.email}</td>
                                            <td>{customer.role}</td>
                                            <td>
                                                <button className="delete-customer" onClick={() => onHandleDelete(customer._id)}><MdDelete /></button>
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
    );
};

export default Customer;
