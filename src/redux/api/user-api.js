import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import axios from "axios";

export const userAPI = createApi({
    reducerPath: "userApi",
    baseQuery: fetchBaseQuery({ baseUrl: `${import.meta.env.VITE_SERVER}/api/v1/user/` }),
    tagTypes: ["users"],
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (user) => ({
                url: "new",
                method: "POST",
                body: user,

            }),
            invalidatesTags: ["users"]
        }),

        deleteUser: builder.mutation({
            query: ({ userid, adminUserId }) => ({
                url: `${userid}?id=${adminUserId}`,
                method: "DELETE",
            }),
            invalidatesTags: ["users"]
        }),

        allUsers: builder.query({
            query: (id) => ({
                url: `all?id=${id}`,
                method: "GET",
            }),

            invalidatesTags: ["users"]

        })

    })
})

export const getUser = async (id) => {
    try {
        const { data } = await axios.get(`${import.meta.env.VITE_SERVER}/api/v1/user/${id}`)
        return data;
    } catch (error) {
        throw error
    }
}

export const { useLoginMutation, useAllUsersQuery, useDeleteUserMutation } = userAPI;