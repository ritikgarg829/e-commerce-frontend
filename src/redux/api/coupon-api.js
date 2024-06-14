import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


export const couponApi = createApi({
    reducerPath: "couponApi",
    baseQuery: fetchBaseQuery({
        baseUrl: `${import.meta.env.VITE_SERVER}/api/v1/payment/`
    }),
    tagTypes: ["coupon"],
    endpoints: (builder) => ({

        newCoupon: builder.mutation({
            query: ({ coupon, userid, amount }) => ({ url: `coupon/new?id=${userid}`, method: "POST", body: { coupon, amount } }),
            invalidatesTags: ["coupon"]
        }),


        deleteCoupon: builder.mutation({
            query: ({ userid, couponid }) => ({ url: `delete/coupon/${couponid}?id=${userid}`, method: "DELETE" }),
            invalidatesTags: ["coupon"]
        }),


        allCoupon: builder.query({
            query: (id) => ({ url: `all/coupon?id=${id}`, method: "GET" }),
            providesTags: ["coupon"]
        }),


    }),
})

export const { useAllCouponQuery, useDeleteCouponMutation, useNewCouponMutation } = couponApi;