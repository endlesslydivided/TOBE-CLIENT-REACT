import { setFeedCollection } from "../store/reducers/PostSlice";
import { apiSlice } from "./ApiSlice";


export const usersApiSlice = apiSlice.injectEndpoints({   
    endpoints: builder => ({
        updateUser: builder.mutation({
            query: ({id,dto}) => ({
                url:`/users/${id}`,
                method:`PUT`,
                body: dto
            }),
            invalidatesTags:['CurrentUser']         

        }),
        getPagedUsers: builder.query({
            query: (filters) => ({
                url:`/users`,
                method:`GET`,
                params:filters
            }),
            providesTags: (result, error, arg) =>
            result
              ? [...result.rows.map(({ id }:any ) => ({ type: 'User' as const, id })), 'User']
              : ['User'],
        }),
        getPagedFriendsByUser: builder.query({
            query: ({id,filters}) => ({
                url:`/users/${id}/friends`,
                method:`GET`,
                params:filters
            }),
            providesTags: (result, error, arg) =>
            result
              ? [...result.rows.map(({ id }:any ) => ({ type: 'Friend' as const, id })),'Friend']
              : ['Friend'],
        }),
        getPagedFriendsRequestsByUser: builder.query({
            query: ({id,filters}) => ({
                url:`/users/${id}/requests`,
                method:`GET`,
                params: filters
            }),
            providesTags: (result, error, arg) =>
            result
              ? [...result.rows.map(({ id }:any ) => ({ type: 'FriendsRequest' as const, id })),'FriendsRequest']
              : ['FriendsRequest'],
        }),
        getPagedAvoidedRequestsByUser: builder.query({
            query: ({id,filters}) => ({
                url:`/users/${id}/avoidedRequests`,
                method:`GET`,
                params:filters
            }),
            providesTags: (result, error, arg) =>
            result
              ? [...result.rows.map(({ id }:any ) => ({ type: 'AvoidedRequest' as const, id })),'AvoidedRequest']
              : ['AvoidedRequest'],
        }),
        getPagedPostsByUser: builder.query({
            query: ({id,filters}) => ({
                url:`/users/${id}/posts`,
                method:`GET`,
                params: filters
            }),
            providesTags: (result, error, arg) =>
            result
              ? [...result.rows.map(({ id }:any ) => ({ type: 'Post' as const, id })),'Post']
              : ['Post'],
        }),
        getPagedDialogsByUser: builder.query({
            query: ({id,filters}) => ({
                url:`/users/${id}/dialogs`,
                method:`GET`,
                params:filters
            }),
            providesTags: (result, error, arg) =>
            result
              ? [...result.rows.map(({ id }:any ) => ({ type: 'Dialog' as const, id })), 'Dialog']
              : ['Dialog'],
        }),
        getPagedFeedByUser: builder.query({
            query: ({id,limit = 10,page = 1}) => ({
                url:`/users/${id}/feed`,
                method:`GET`,
                params:{limit,page}
            }),
            providesTags: (result, error, arg) =>
            result
              ? [...result.rows.map(({ id }:any ) => ({ type: 'Feed' as const, id })),'Feed']
              : ['Feed']
        }),
        getUser: builder.query({
            query: ({id}) => ({
                url:`/users/${id}`,
                method:`GET`
            }),
            providesTags: (result, error, arg) =>
            result
              ? [{ type: 'User' as const, id:result.id }, 'User']
              : ['User'],
        }),
    })
})


export const {
    useUpdateUserMutation,

    useGetUserQuery,

    useGetPagedUsersQuery,

    useGetPagedFriendsByUserQuery,

    useGetPagedFriendsRequestsByUserQuery,
    useGetPagedAvoidedRequestsByUserQuery,

    useGetPagedPostsByUserQuery,
    useGetPagedDialogsByUserQuery,
    useGetPagedFeedByUserQuery

} = usersApiSlice;