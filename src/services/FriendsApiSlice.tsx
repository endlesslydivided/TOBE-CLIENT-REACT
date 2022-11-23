import { apiSlice } from "./ApiSlice";


export const friendsApiSlice = apiSlice.injectEndpoints({   
    endpoints: builder => ({
        createFriend: builder.mutation({
            query: (dto) => ({
                url:`/friends`,
                method:`POST`,
                body: dto
            }),
            invalidatesTags: ['Friend','FriendsRequest','CurrentUser','AvoidedRequest']
        }),
        updateFriend: builder.mutation({
            query: ({id,dto}) => ({
                url:`/friends/${id}`,
                method:`PUT`,
                body: dto
            }),
            invalidatesTags: (result, error, arg) => [{ type: 'Friend', id: arg.id },'Friend','FriendsRequest','CurrentUser','AvoidedRequest']          
        }),
        deleteFriend: builder.mutation({
            query: ({id}) => ({
                url:`/friends/${id}`,
                method:`DELETE`
            }),
            invalidatesTags: (result, error, arg) => [{ type: 'Friend', id: arg.id },'Friend','FriendsRequest','CurrentUser','AvoidedRequest']          
        })
    })
})


export const {
    useCreateFriendMutation,
    useUpdateFriendMutation,
    useDeleteFriendMutation,
} = friendsApiSlice;