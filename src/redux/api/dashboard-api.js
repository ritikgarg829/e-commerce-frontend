import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


export const dashboardApi = createApi({
    reducerPath: "dashboardApi",
    baseQuery: fetchBaseQuery({
        baseUrl: `${import.meta.env.VITE_SERVER}/api/v1/dashboard/`
    }),
    endpoints: (builder) => ({

        state: builder.query({
            query: (id) => ({
                url: `stats?id=${id}`,
                method: "GET"
            })
        })


    }),
})

export const { useStateQuery } = dashboardApi;