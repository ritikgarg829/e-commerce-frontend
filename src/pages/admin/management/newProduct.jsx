import { useState } from 'react';
import AdminSidebar from '../../../components/admin/adminSidebar';
import "../../../Styles/admin/newProduct.css"
import { useSelector } from 'react-redux';
import { useCreateProductsMutation } from "../../../redux/api/product-api.js"
import toast from "react-hot-toast"
import { useNavigate } from 'react-router-dom';

const NewProduct = () => {

    const navigate = useNavigate();
    const { user } = useSelector((state) => state.userReducer);
    const [createProduct, { isError, error }] = useCreateProductsMutation();

    const [name, setName] = useState("");
    const [price, setPrice] = useState(0);
    const [stock, setStock] = useState(0);
    const [category, setCategory] = useState("");
    const [photoPrev, setPhotoPrev] = useState("");
    const [photo, setPhoto] = useState();

    const changeImageHandler = (e) => {
        const file = e.target.files?.[0];

        const reader = new FileReader();

        if (file) {
            reader.readAsDataURL(file);
            reader.onloadend = () => {
                if (typeof reader.result === "string") {
                    setPhotoPrev(reader.result);
                    setPhoto(file);
                }
            };
        }
    };


    const submitHandler = async (e) => {
        e.preventDefault();

        if (!name || !price || !stock || !category || !photo) return;

        const formData = new FormData();
        formData.append("name", name);
        formData.append("price", price);
        formData.append("stock", stock);
        formData.append("category", category);
        formData.append("photo", photo);

        try {
            const res = await createProduct({ id: user?._id, formData }); // Ensure the correct parameter name is passed
            // Optionally, reset form fields after successful submission
            setName("");
            setPrice(0);
            setStock(0);
            setCategory("");
            setPhoto();

            if ("data" in res) {
                toast.success("product created successfully");

            } else {
                const error = res.error;
                const message = (error.data).message;
                toast.error(message)
            }


        } catch (error) {
            // Handle error
            console.error("Error creating product:", error);
        }

        navigate("/admin/product");
    };


    return (
        <div className="admin-container">
            <AdminSidebar />
            <main className="product-management">
                <article>
                    <form onSubmit={submitHandler}>
                        <h2>New Product</h2>
                        <div className="form-input">
                            <label>Name</label>
                            <input
                                required
                                type="text"
                                placeholder="Name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                        <div className="form-input">
                            <label>Price</label>
                            <input
                                required
                                type="number"
                                placeholder="Price"
                                value={price}
                                onChange={(e) => setPrice((e.target.value))}
                            />
                        </div>
                        <div className="form-input">
                            <label>Stock</label>
                            <input
                                required
                                type="number"
                                placeholder="Stock"
                                value={stock}
                                onChange={(e) => setStock((e.target.value))}
                            />
                        </div>

                        <div className="form-input">
                            <label>Category</label>
                            <input
                                required
                                type="text"
                                placeholder="Category"
                                value={category}
                                onChange={(e) => setCategory((e.target.value))}
                            />
                        </div>

                        <div className="form-input">
                            <label>Photo</label>
                            <input required type="file" onChange={changeImageHandler} />
                        </div>

                        {photoPrev && <img src={photoPrev} alt="New Image" />}

                        <button className="create" type=" submit">Create</button>
                    </form>
                </article>
            </main>
        </div >
    )
}

export default NewProduct;
