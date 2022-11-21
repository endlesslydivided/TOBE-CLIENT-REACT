import { apiSlice } from "./ApiSlice";


export const postsApiSlice = apiSlice.injectEndpoints({   
    endpoints: builder => ({
        createPost: builder.mutation({
            query: (post) => ({
                url:'/posts',
                method:'POST',
                body: post,
                credentials: 'include',
            }),
            invalidatesTags: ['Feed','Post']          
        }),

        updatePost: builder.mutation({
            query: ({id,photo}) =>({
                url: `/posts/${id}`,
                method:'POST',
                body: photo,
                credentials: 'include',
            }),
            invalidatesTags: (result, error, arg) => [{ type: 'Post', id: arg.id },'Post','Feed']          
        }),

        deletePost: builder.mutation({
            query: ({ id }) =>
            ({
                url: `/posts/${id}`,
                method: 'DELETE',
                credentials: 'include',
            }),  
            invalidatesTags: (result, error, arg) => [{ type: 'Post', id: arg.id },'Post','Feed']          
      
        }),

        getOnePost: builder.query({
            query: ({id}) => ({
                url: `/posts/${id}`,
                method: 'GET',
                credentials: 'include',
            }),
            providesTags: (result, error, arg) =>
            [{ type: 'Post' as const, id:arg.id }]
        }),
         
    })
})


export const {
useCreatePostMutation,
useUpdatePostMutation,
useDeletePostMutation,
useGetOnePostQuery} = postsApiSlice;