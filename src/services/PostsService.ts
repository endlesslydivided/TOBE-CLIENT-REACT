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

        deletePosts: builder.mutation({
            query: (ids) =>
            ({
                url: `/posts?${ids.toString()}`,
                method: 'DELETE',
                credentials: 'include',
            }),  
            invalidatesTags: (result, error, arg) => [{ type: 'Post', id: arg.id }]          
      
        }),

        getOnePost: builder.query({
            query: (id) => ({
                url: `/posts/${id}`,
                method: 'GET',
                credentials: 'include',
            })
        }),
        getAllPosts: builder.query({
            query: ({filters}) => ({
                url: `/posts`,
                method: 'GET',
                credentials: 'include',
                params:filters
            })
        }),
         
    })
})


export const {
useCreatePostMutation,
useUpdatePostMutation,
useDeletePostMutation,
useDeletePostsMutation,
useLazyGetOnePostQuery,
useGetAllPostsQuery} = postsApiSlice;