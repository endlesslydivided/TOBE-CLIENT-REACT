import { apiSlice } from "./ApiSlice";


export const adminApiSlice = apiSlice.injectEndpoints({   
    endpoints: builder => ({
        getPostsStats: builder.query({
            query: () =>
            ({
                url: `/stats/posts`,
                method: 'GET',
                credentials: 'include',
            }),
        }),
        getUsersStats: builder.query({
            query: () =>
            ({
                url: `/stats/users`,
                method: 'GET',
                credentials: 'include',
            }),
        }),
        getMessagesStats: builder.query({
            query: () =>
            ({
                url: `/stats/messages`,
                method: 'GET',
                credentials: 'include',
            }),
        }),
        getPhotosStats: builder.query({
            query: () =>
            ({
                url: `/stats/photos`,
                method: 'GET',
                credentials: 'include',
            }),
        }),
        sendEmail: builder.mutation({
            query: (message) =>
            ({
                url: `/mail/send`,
                method: 'POST',
                credentials: 'include',
                body:message
            }),
        })
    })
})



export const {
useGetMessagesStatsQuery,
useGetPostsStatsQuery,
useGetUsersStatsQuery,
useGetPhotosStatsQuery,
useSendEmailMutation} = adminApiSlice;