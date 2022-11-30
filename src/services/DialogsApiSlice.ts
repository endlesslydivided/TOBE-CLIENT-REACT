import { apiSlice } from "./ApiSlice";


export const dialogApiSlice = apiSlice.injectEndpoints({   
    endpoints: builder => ({
        createDialog: builder.mutation({
            query: (dialog) => ({
                url:'/dialogs',
                method:'POST',
                body: dialog,
                credentials: 'include',
            }),
            invalidatesTags: ['Dialog','CurrentUser']
        }),
        updateDialog: builder.mutation({
            query: ({id,dialog}) =>({
                url: `/dialogs/${id}`,
                method:'POST',
                body: dialog,
                credentials: 'include',
            }),
            invalidatesTags: (result, error, arg) => [{ type: 'Dialog', id: arg.id },'Dialog']
        }),
        deleteDialog: builder.mutation({
            query: ({ id }) =>
            ({
                url: `/dialogs/${id}`,
                method: 'DELETE',
                credentials: 'include',
            }),
            invalidatesTags:(result, error, arg) =>  [{type:'Dialog',id:arg.id},'Dialog','CurrentUser']
            
        })
         
    })
})


export const {
useCreateDialogMutation,
useUpdateDialogMutation,
useDeleteDialogMutation
} = dialogApiSlice;