import { apiSlice } from "./ApiSlice";


export const userApiSlice = apiSlice.injectEndpoints({   
    endpoints: builder => ({
        updateUser: builder.mutation({
            query: ({id,dto}) => ({
                url:`/users/${id}`,
                method:`PUT`,
                body: dto
            })
        })
    })
})


export const {
    useUpdateUserMutation} = userApiSlice;