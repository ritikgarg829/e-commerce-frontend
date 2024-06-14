import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import AdminSidebar from '../../../components/admin/adminSidebar.jsx';
import "../../../Styles/admin/coupon.css";
import { FaPlus } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { useAllCouponQuery, useDeleteCouponMutation } from "../../../redux/api/coupon-api.js"


const coupon = () => {

    const { user } = useSelector(state => state.userReducer);

    const { data, isLoading, isError } = useAllCouponQuery(user?._id);
    const [deleteuser] = useDeleteCouponMutation(user?._id);

    if (isError) Toast.error(isError.data.message);

    const [couponData, setCouponData] = useState([]);

    console.log("data is", data)

    useEffect(() => {
        if (data) {
            setCouponData(data.discount);
            console.log("my data is", couponData)
        }
    }, [data]);

    if (isError) {
        toast.error(isError.data.message);
    }



    const deletehandler = async (id) => {

        const res = await deleteuser({ userid: user?._id, couponid: id })
        if ("data" in res) {
            toast.success("coupon deleted successfully");
            setCouponData(prev => prev.filter(coupon => coupon._id !== id));
        } else {
            const error = res.error;
            const message = error.data.message;
            toast.error(message);
        }


    }

    return (
        <>
            <div className="adminContainer-coupon">
                <AdminSidebar />
                <main>
                    <div className="New-Product">
                        <Link to="/admin/create-coupon" className="create-product-link">
                            Create new Coupon &nbsp;<FaPlus />
                        </Link>
                    </div>
                    <div className="container">
                        <div className="order-view">
                            <h1 className="all-coupon text-center">All - Coupons</h1>
                            <div className="main">
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Id</th>
                                            <th>Coupon</th>
                                            <th>Amount</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>

                                        {couponData.length > 0 ? (
                                            couponData.map(coupon => (
                                                <tr key={coupon._id}>
                                                    <td>{coupon._id}</td>
                                                    <td>{coupon.coupon}</td>
                                                    <td>₹{coupon.amount}</td>
                                                    <td>
                                                        <button className="coupon-delete-btn" onClick={() => deletehandler(coupon._id)}><MdDelete /></button>
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan="5">No products found</td>
                                            </tr>
                                        )}


                                    </tbody>

                                </table>
                            </div>
                        </div>
                    </div>
                </main >
            </div >
        </>
    )
}

export default coupon;
