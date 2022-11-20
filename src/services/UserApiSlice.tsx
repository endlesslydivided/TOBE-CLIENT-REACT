import { apiSlice } from "./ApiSlice";


export const userApiSlice = apiSlice.injectEndpoints({   
    endpoints: builder => ({
        updateUser: builder.mutation({
            query: ({id,dto}) => ({
                url:`/users/${id}`,
                method:`PUT`,
                body: dto
            })
        }),
        getUsers: builder.query({
            query: ({limit = 9,page = 1}) => ({
                url:`/users`,
                method:`GET`,
                params:{limit,page}
            }),
            
        }),
        getUser: builder.query({
            query: ({id}) => ({
                url:`/users/${id}`,
                method:`GET`
            })
        }),
    })
})


export const {
    useUpdateUserMutation,
    useGetUserQuery,
    useGetUsersQuery
} = userApiSlice;