import { apiSlice } from "./ApiSlice";


export const photoApiSlice = apiSlice.injectEndpoints({   
    endpoints: builder => ({
        createPhoto: builder.mutation({
            query: (photo) => ({
                url:'/photos',
                method:'POST',
                body: photo,
                credentials: 'include',
            }),
            invalidatesTags: ['Photo']
        }),
        updatePhoto: builder.mutation({
            query: ({id,photo}) =>({
                url: `/photos/${id}`,
                method:'POST',
                body: photo,
                credentials: 'include',
            }),
            invalidatesTags: (result, error, arg) => [{ type: 'Photo', id: arg.id },'Photo']
        }),
        deletePhoto: builder.mutation({
            query: ({ id }) =>
            ({
                url: `/photos/${id}`,
                method: 'DELETE',
                credentials: 'include',
            }),
            invalidatesTags:(result, error, arg) =>  [{type:'Photo',id:arg.id},'Photo']
            
        }),

        getOne: builder.query({
            query: ({id}) => ({
                url: `/photos/${id}`,
                method: 'GET',
                credentials: 'include',
            }),
            providesTags: (result, error, arg) =>
            [{ type: 'Photo' as const, id:arg.id }]
        }),
         
    })
})


export const {
useCreatePhotoMutation,
useUpdatePhotoMutation,
useDeletePhotoMutation,
useGetOneQuery} = photoApiSlice;