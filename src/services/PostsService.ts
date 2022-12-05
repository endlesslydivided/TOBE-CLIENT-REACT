import { apiSlice } from "./ApiSlice";


export const postsApiSlice = apiSlice.injectEndpoints({   
    endpoints: builder => ({
        createPost: builder.mutation({
            query: (post) => ({
                url:'/posts',
                method:'POST',
                body: post,
                credentials: 'include',
            })          
        }),

        updatePost: builder.mutation({
            query: ({id,photo}) =>({
                url: `/posts/${id}`,
                method:'POST',
                body: photo,
                credentials: 'include',
            }),
            invalidatesTags: (result, error, arg) => [{ type: 'Post', id: arg.id }]          
        }),

        deletePost: builder.mutation({
            query: (id) =>
            ({
                url: `/posts/${id}`,
                method: 'DELETE',
                credentials: 'include',
            }),  
            invalidatesTags: (result, error, arg) => [{ type: 'Post', id: arg.id }]          
      
        }),

        getOnePost: builder.query({
            query: ({id}) => ({
                url: `/posts/${id}`,
                method: 'GET',
                credentials: 'include',
            })
        }),
         
    })
})


export const {
useCreatePostMutation,
useUpdatePostMutation,
useDeletePostMutation,
useLazyGetOnePostQuery} = postsApiSlice;