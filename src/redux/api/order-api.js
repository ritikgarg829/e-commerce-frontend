import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


export const orderApi = createApi({
    reducerPath: "orderApi",
    baseQuery: fetchBaseQuery({
        baseUrl: `${import.meta.env.VITE_SERVER}/api/v1/order/`
    }),
    tagTypes: ["orders"],
    endpoints: (builder) => ({

        newOrder: builder.mutation({
            query: (order) => ({ url: "new", method: "POST", body: order }),
            invalidatesTags: ["orders"]
        }),

        updateOrder: builder.mutation({
            query: ({ userid, orderid }) => ({ url: `${orderid}?id=${userid}`, method: "PUT" }),
            invalidatesTags: ["orders"]
        }),

        deleteOrder: builder.mutation({
            query: ({ userid, orderid }) => ({ url: `${orderid}?id=${userid}`, method: "DELETE" }),
            invalidatesTags: ["orders"]
        }),

        myOrder: builder.query({
            query: (id) => ({ url: `myorder?id=${id}`, method: "GET" }),
            providesTags: ["orders"]
        }),

        allOrder: builder.query({
            query: (id) => ({ url: `allorders?id=${id}`, method: "GET" }),
            providesTags: ["orders"]
        }),

        singleOrder: builder.query({
            query: (id) => ({ url: `${id}`, method: "GET" }),
            providesTags: ["orders"]
        }),

    }),
})

export const { useNewOrderMutation, useAllOrderQuery, useMyOrderQuery, useSingleOrderQuery, useDeleteOrderMutation, useUpdateOrderMutation } = orderApi;