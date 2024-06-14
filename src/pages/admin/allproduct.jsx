import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import AdminSidebar from '../../components/admin/adminSidebar';
import "../../Styles/admin/product.css";
import { FaPlus } from "react-icons/fa";
import Toast from 'react-hot-toast';
import { useAllProductsQuery } from "../../redux/api/product-api.js"
import { useSelector } from 'react-redux';
import { server } from "../../redux/store.js"




const AllProduct = () => {

    const { user } = useSelector(state => state.userReducer);


    const { data, isLoading, isError } = useAllProductsQuery(user?._id);

    if (isError) Toast.error(isError.data.message);

    const [productData, setProductData] = useState([]);

    console.log("data is", data)

    useEffect(() => {
        if (data) {
            setProductData(data.products);
            console.log("my data is", productData)
        }
    }, [data]);

    if (isError) {
        Toast.error(isError.data.message);
    }

    return (
        <>
            <div className="adminContainer-product">
                <AdminSidebar />
                <main className="main-product">
                    <div className="New-Product">
                        <Link to="/admin/newproduct" className="create-product-link">
                            Create new Product &nbsp;<FaPlus />
                        </Link>
                    </div>
                    <div className="container-product">
                        <div className="order-view">
                            <h1 className="text-center">All - Products</h1>
                            <div className="main-data">
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Photo</th>
                                            <th>Name</th>
                                            <th>Price</th>
                                            <th>Stock</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>

                                        {productData.length > 0 ? (
                                            productData.map(product => (
                                                <tr key={product._id}>
                                                    <td><img className="w-12 h-12" src={`${server}/${product.photo}`} /></td>
                                                    <td>{product.name}</td>
                                                    <td>₹{product.price}</td>
                                                    <td>{product.stock}</td>
                                                    <td>
                                                        <Link className="view" to={`/admin/management/manageproducts/${product._id}`}>Manage</Link>
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
                </main>
            </div>
        </>
    )
}

export default AllProduct;
