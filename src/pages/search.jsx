import React, { useState } from 'react';
import "../Styles/search.css";
import ProductCard from '../components/productCard';
import { useAllCategoriesQuery, useSearchProductsQuery } from '../redux/api/product-api.js';
import Toast from "react-hot-toast";
import { addTocart } from "../redux/reducer/cartReducer.js"
import { useDispatch } from 'react-redux';

const Search = () => {

    const dispatch = useDispatch();

    const [search, setSearch] = useState("");
    const [sort, setSort] = useState("");
    const [maxPrice, setMaxPrice] = useState("");
    const [category, setCategory] = useState("");
    const [page, setPage] = useState(1);

    const { data: categoriesData, isError } = useAllCategoriesQuery();
    const { data: searchData, searchError } = useSearchProductsQuery({ search, sort, category, page, price: maxPrice });

    if (isError) Toast.error(isError.data.message);
    if (searchError) Toast.error(searchError.data.message);
    const AddtoCartHandler = (cartItems) => {
        if (cartItems.stock < 1) return Toast.error("out of stock");
        dispatch(addTocart(cartItems));
        Toast.success("Added In a Cart")
    };

    // Determine if prev/next buttons should be disabled
    const isPrevPage = page > 1;
    const isNextPage = searchData && page < searchData.totalpage;

    const handleCategoryChange = (e) => {
        setCategory(e.target.value);
        setPage(1); // Reset page number when category changes
    };

    return (
        <div className="product-serach">
            <aside>
                <h1 className="filter">Filter</h1>
                <div>
                    <h3>Sort</h3>
                    <select value={sort} onChange={(e) => setSort(e.target.value)}>
                        <option value="">None</option>
                        <option value="asc">Price (Low to High)</option>
                        <option value="dsc">Price (High to Low)</option>
                    </select>
                </div>

                <div>
                    <h3 className="mt-3">Max Price : {maxPrice || ""}</h3>
                    <input value={maxPrice} type="range" min={100} max={50000} onChange={(e) => setMaxPrice(Number(e.target.value))} />
                </div>

                <div>
                    <h3>Category</h3>
                    <select value={category} onChange={handleCategoryChange}>
                        <option value="">All</option>
                        {categoriesData && categoriesData.success && categoriesData.category.map((category, index) => (
                            <option key={index} value={category}>{category.toUpperCase()}</option>
                        ))}
                    </select>
                </div>
            </aside>

            <main>
                <h1 className="filter">Products</h1>
                <input className="searchbar" type="text" placeholder=' Search By Name..' value={search} onChange={(e) => setSearch(e.target.value)} />
                <div className="search-product-list">
                    {/* ProductCard components */}
                    {searchData && searchData.products.map((product) => (
                        <ProductCard
                            key={product._id}
                            productid={product._id}
                            photo={product.photo}
                            name={product.name}
                            price={product.price}
                            stock={product.stock}
                            handler={AddtoCartHandler}
                        />
                    ))}
                </div>
                {searchData && searchData.totalpage > 1 && (
                    <article>
                        <button
                            className="pages"
                            disabled={!isPrevPage}
                            onClick={() => setPage((prev) => prev - 1)}
                        >
                            Prev
                        </button>
                        <span>{page} of {searchData.totalpage} </span>
                        <button
                            className="pages"
                            disabled={!isNextPage}
                            onClick={() => setPage((prev) => prev + 1)}
                        >
                            Next
                        </button>
                    </article>
                )}
            </main>
        </div>
    );
};

export default Search;
