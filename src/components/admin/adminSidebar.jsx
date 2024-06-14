import React from 'react'
import { Link, useLocation } from "react-router-dom"
import { RiShoppingBag3Fill, RiCoupon4Line } from "react-icons/ri"
import { FaCartShopping } from "react-icons/fa6";

import { AiFillFileText } from "react-icons/ai"
import { IoIosPeople, IoMdStopwatch } from "react-icons/io"
import { FaGamepad } from "react-icons/fa"
import "../../Styles/admin/adminSlidebar.css"
const adminSidebar = () => {

    const location = useLocation();


    return (
        <>

            {/* Component Start */}
            <div className="flex flex-col items-center w-40 h-full overflow-hidden text-gray-400 bg-black">
                <Link className="flex items-center w-full px-3 mt-3" to="/admin/dashboard">
                    <FaCartShopping />
                    <span className="ml-2 text-sm font-bold">Shopping</span>
                </Link>
                <div className="w-full px-2">
                    <div className="flex flex-col items-center w-full mt-3 border-t border-gray-700">
                        <Link
                            className="flex items-center w-full h-12 px-3 mt-2 rounded hover:bg-gray-700 text-gray-300"
                            style={{ backgroundColor: location.pathname.includes("/admin/dashboard") ? "grey" : "none" }} to="/admin/dashboard"
                        >
                            <svg
                                className="w-6 h-6 stroke-current"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                                />
                            </svg>
                            <span className="ml-2 text-sm font-medium">Dasboard</span>
                        </Link>
                        <Link
                            className="flex items-center w-full h-12 px-3 mt-2 rounded hover:bg-gray-700 text-gray-300"
                            style={{ backgroundColor: location.pathname.includes("/admin/product") ? "grey" : "none" }} to="/admin/product"
                        >
                            <RiShoppingBag3Fill />
                            <span className="ml-2 text-sm font-medium">Product</span>
                        </Link>
                        <Link
                            className="flex items-center w-full h-12 px-3 mt-2 rounded hover:bg-gray-700 text-gray-300"
                            style={{ backgroundColor: location.pathname.includes("/admin/customer") ? "grey" : "none" }} to="/admin/customer"
                        >
                            <IoIosPeople />

                            <span className="ml-2 text-sm font-medium">Customer</span>
                        </Link>
                        <Link
                            className="flex items-center w-full h-12 px-3 mt-2 rounded hover:bg-gray-700 text-gray-300"
                            style={{ backgroundColor: location.pathname.includes("/admin/transection") ? "grey" : "none" }} to="/admin/transection"
                        >
                            <AiFillFileText />
                            <span className="ml-2 text-sm font-medium">Transection</span>
                        </Link>
                    </div>
                    <div className="flex flex-col items-center w-full mt-2 border-t border-gray-700">
                        <Link
                            className="flex items-center w-full h-12 px-3 mt-2 rounded hover:bg-gray-700 text-gray-300"
                            style={{ backgroundColor: location.pathname.includes("/admin/stopwatch") ? "grey" : "none" }} to="/admin/stopwatch"
                        >
                            <IoMdStopwatch />

                            <span className="ml-2 text-sm font-medium">Stopwatch</span>
                        </Link>
                        <Link
                            className="flex items-center w-full h-12 px-3 mt-2 rounded hover:bg-gray-700 text-gray-300"
                            style={{ backgroundColor: location.pathname.includes("/admin/coupon") ? "grey" : "none" }} to="/admin/coupon"
                        >
                            <RiCoupon4Line />
                            <span className="ml-2 text-sm font-medium">Coupon</span>
                        </Link>
                        <Link
                            className="flex items-center w-full h-12 px-3 mt-2 rounded hover:bg-gray-700 text-gray-300"
                            style={{ backgroundColor: location.pathname.includes("/admin/toss") ? "grey" : "none" }} to="/admin/toss"
                        >
                            <FaGamepad />
                            <span className="ml-2 text-sm font-medium">Toss</span>
                        </Link>
                    </div>
                </div>
                <Link
                    className="flex items-center justify-center w-full h-16 mt-auto bg-gray-800 hover:bg-gray-700 hover:text-gray-300"
                    to="#"
                >
                    <svg
                        className="w-6 h-6 stroke-current"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                    </svg>
                    <span className="ml-2 text-sm font-medium">Account</span>
                </Link>
            </div >
            {/* Component End  */}

        </>


    )
}

export default adminSidebar
