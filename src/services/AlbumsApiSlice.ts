import { apiSlice } from "./ApiSlice";


export const albumApiSlice = apiSlice.injectEndpoints({   
    endpoints: builder => ({
        createAlbum: builder.mutation({
            query: (album) => ({
                url:'/albums',
                method:'POST',
                body: album,
                credentials: 'include',
            })
        }),
        updateAlbum: builder.mutation({
            query: ({id,album}) =>({
                url: `/albums/${id}`,
                method:'POST',
                body: album,
                credentials: 'include',
                }
            )
        }),
        deleteAlbum: builder.mutation({
            query: ({ id }) =>
            ({
                url: `/albums/${id}`,
                method: 'DELETE',
                credentials: 'include',
            }),
            
        })
    })
})


export const {
useCreateAlbumMutation,
useUpdateAlbumMutation,
useDeleteAlbumMutation,} = albumApiSlice;