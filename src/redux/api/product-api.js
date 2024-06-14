import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


export const productAPI = createApi({
    reducerPath: "productApi",
    baseQuery: fetchBaseQuery({ baseUrl: `${import.meta.env.VITE_SERVER}/api/v1/product/` }),
    tagType: ["products"],
    endpoints: (builder) => ({
        lastestProducts: builder.query({ query: () => "latest", providesTags: ["products"] }),
        allProducts: builder.query({ query: (id) => `admin-products?id=${id}`, providesTags: ["products"] }),
        allCategories: builder.query({ query: () => "categories", providesTags: ["products"] }),
        searchProducts: builder.query({
            query: ({ price, search, sort, category, page }) => {

                let base = `searchproduct?search=${search}&page=${page}`
                if (price) base += `&price=${price}`
                if (category) base += `&category=${category}`
                if (sort) base += `&sort=${sort}`

                return base;
            }, providesTags: ["products"]
        }),


        productDetails: builder.query({ query: (id) => `singleproduct/${id}`, providesTags: ["products"] }),

        createProducts: builder.mutation({
            query: ({ id, formData }) => ({
                url: `new?id=${id}`,
                method: "POST",
                body: formData
            }),
            invalidatesTags: ["products"]
        }),


        updateProducts: builder.mutation({
            query: ({ userid, productid, formData }) => ({
                url: `updateproduct/${productid}?id=${userid}`,
                method: "PUT",
                body: formData
            }),
            invalidatesTags: ["products"]
        }),

        deleteProducts: builder.mutation({
            query: ({ userid, productid }) => ({
                url: `deleteproduct/${productid}?id=${userid}`,
                method: "DELETE",
            }),
            invalidatesTags: ["products"]
        }),


    })
})



export const { useLastestProductsQuery, useAllProductsQuery, useAllCategoriesQuery, useSearchProductsQuery, useProductDetailsQuery, useCreateProductsMutation, useUpdateProductsMutation, useDeleteProductsMutation } = productAPI;