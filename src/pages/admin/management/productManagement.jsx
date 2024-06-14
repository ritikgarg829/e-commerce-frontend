import React, { useState, useEffect } from 'react'
import AdminSidebar from '../../../components/admin/adminSidebar'
import "../../../Styles/admin/management/productManagement.css"
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { useProductDetailsQuery, useUpdateProductsMutation, useDeleteProductsMutation } from "../../../redux/api/product-api"
import { server } from "../../../redux/store.js"
import { FaTrash } from "react-icons/fa"
import toast from "react-hot-toast"
import { useNavigate } from "react-router-dom"

const productManagement = () => {

    const navigate = useNavigate();

    const { user } = useSelector((state) => state.userReducer);

    const params = useParams();

    const { data, isError, error } = useProductDetailsQuery(params.id);
    const [updateProducts] = useUpdateProductsMutation();
    const [deleteProduct] = useDeleteProductsMutation();

    const { name, price, stock, category, photo } = data?.product || {
        _id: "",
        name: "",
        price: 0,
        stock: 0,
        category: "",
        photo: ""
    };

    const [nameUpdate, setNameUpdate] = useState(name);
    const [priceUpdate, setPriceUpdate] = useState(price);
    const [stockUpdate, setStockUpdate] = useState(stock);
    const [categoryUpdate, setcategoryUpdate] = useState(category);
    const [photoUpdate, setPhotoUpdate] = useState(photo);
    const [photoFile, setPhotoFile] = useState();

    const changeImageHandler = (e) => {
        const file = e.target.files?.[0];

        const reader = new FileReader();

        if (file) {
            reader.readAsDataURL(file);
            reader.onloadend = () => {
                if (typeof reader.result === "string") {
                    setPhotoUpdate(reader.result);
                    setPhotoFile(file);
                }
            };
        }
    };

    const submitHandler = async (e) => {
        e.preventDefault();

        const formData = new FormData();

        if (nameUpdate) formData.set("name", nameUpdate);
        if (priceUpdate) formData.set("price", priceUpdate.toString());
        if (stockUpdate !== undefined) formData.set("stock", stockUpdate.toString());
        if (photoUpdate) formData.set("photo", photoUpdate);
        if (photoFile) formData.set("photo", photoFile);

        if (categoryUpdate) formData.set("category", categoryUpdate);

        try {
            const res = await updateProducts({ userid: user?._id, productid: params.id, formData }); // Ensure the correct parameter name is passed

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
        navigate('/admin/product');

    };


    const deleteHandler = async () => {
        const res = await deleteProduct({
            userid: user?._id,
            productid: data?.product._id,
        });

        toast.success("product deleted successfully");
        navigate('/admin/product');

    };

    useEffect(() => {
        if (data) {
            setNameUpdate(data.product.name)
            setPriceUpdate(data.product.price)
            setStockUpdate(data.product.stock)
            setcategoryUpdate(data.product.category)
        }
    }, [data]);

    return (
        <div className="adminContainer">
            <AdminSidebar />
            <main className="product-management">
                <section>
                    <strong>ID - {params.id}</strong>
                    <img className="big-img" src={`${server}/${photo}`} alt="Product" />
                    <p className="font-medium">{name}</p>
                    {stock > 0 ? (
                        <span className="stock-span text-green-600 ">{stock} Available</span>
                    ) : (
                        <span className="stock-span text-red-600">Not Available</span>
                    )}
                    <h3 className="font-medium">₹{price}</h3>
                </section>

                <button className="product-delete-btn" onClick={deleteHandler}>
                    <FaTrash />
                </button>

                <article>
                    <form onSubmit={submitHandler}>
                        <h2>Manage</h2>
                        <div>
                            <label>Name</label>
                            <input

                                type="text"
                                placeholder="Name"
                                value={nameUpdate}
                                onChange={(e) => setNameUpdate(e.target.value)}
                            />
                        </div>

                        <div>
                            <label>Price</label>
                            <input

                                type="number"
                                placeholder="Price"
                                value={priceUpdate}
                                onChange={(e) => setPriceUpdate(Number(e.target.value))}
                            />
                        </div>
                        <div>
                            <label>Stock</label>
                            <input

                                type="number"
                                placeholder="Stock"
                                value={stockUpdate}
                                onChange={(e) => setStockUpdate(Number(e.target.value))}
                            />
                        </div>

                        <div>
                            <label>category</label>
                            <input

                                type="text"
                                placeholder="category"
                                value={categoryUpdate}
                                onChange={(e) => setcategoryUpdate(String(e.target.value))}
                            />
                        </div>

                        <div>
                            <label>Photo</label>
                            <input type="file" onChange={changeImageHandler} />
                        </div>

                        {photoUpdate && <img className="small-img" src={`${server}/${photoUpdate}`} alt="New Image" />}

                        <button className="create" type="submit">Update</button>
                    </form>
                </article>
            </main>
        </div>
    )
}

export default productManagement
