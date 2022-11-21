import { apiSlice } from "./ApiSlice";


export const albumApiSlice = apiSlice.injectEndpoints({   
    endpoints: builder => ({
        createAlbum: builder.mutation({
            query: (album) => ({
                url:'/albums',
                method:'POST',
                body: album,
                credentials: 'include',
            }),
            invalidatesTags: ['Album']
        }),
        updateAlbum: builder.mutation({
            query: ({id,album}) =>({
                url: `/albums/${id}`,
                method:'POST',
                body: album,
                credentials: 'include',
            }),
            invalidatesTags:(result, error, arg) =>  [{type:'Album',id:arg.id},'Album']
        }),
        deleteAlbum: builder.mutation({
            query: ({ id }) =>
            ({
                url: `/albums/${id}`,
                method: 'DELETE',
                credentials: 'include',
            }),
            invalidatesTags:(result, error, arg) =>  [{type:'Album',id:arg.id},'Album']

        })
    })
})



export const {
useCreateAlbumMutation,
useUpdateAlbumMutation,
useDeleteAlbumMutation,} = albumApiSlice;