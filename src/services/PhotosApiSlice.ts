import { apiSlice } from "./ApiSlice";


export const photoApiSlice = apiSlice.injectEndpoints({   
    endpoints: builder => ({
        createPhoto: builder.mutation({
            query: (photo) => ({
                url:'/photos',
                method:'POST',
                body: photo,
                credentials: 'include',
            })
        }),
        updatePhoto: builder.mutation({
            query: ({id,photo}) =>({
                url: `/photos/${id}`,
                method:'POST',
                body: photo,
                credentials: 'include',
                }
            )
        }),
        deletePhoto: builder.mutation({
            query: ({ id }) =>
            ({
                url: `/photos/${id}`,
                method: 'DELETE',
                credentials: 'include',
            }),
            
        }),

        getOne: builder.query({
            query: ({id}) => ({
                url: `/photos/${id}`,
                method: 'GET',
                credentials: 'include',
            })
        }),
         
    })
})


export const {
useCreatePhotoMutation,
useUpdatePhotoMutation,
useDeletePhotoMutation,
useGetOneQuery} = photoApiSlice;