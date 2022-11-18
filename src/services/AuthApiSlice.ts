import { apiSlice } from "./ApiSlice";


export const authApiSlice = apiSlice.injectEndpoints({   
    endpoints: builder => ({
        login: builder.mutation({
            query: (credentials) => ({
                url:'/auth/login',
                method:'POST',
                body: {...credentials}
            })
        }),
        register: builder.mutation({
            query: (data) =>(
                {
                    url: '/auth/registration',
                    method:'POST',
                    body: data
                }
            )
        }),
        verifyEmail: builder.mutation({
            query: ({ verificationCode }) =>
            ({
                url: `/auth/verifyemail/${verificationCode}`,
                method: 'GET',
            }),
            
        }),

        logout: builder.mutation<void,void>({
            query: () => ({
                url: '/auth/logout',
                method: 'GET',
                credentials: 'include',
            })
        }),
        getMe: builder.mutation<any,void>({
            query: () => ({
                url: '/auth/me',
                method: 'GET',
                credentials: 'include',
            })
        }),
    })
})


export const {
    useLoginMutation,
    useRegisterMutation,
    useLogoutMutation,
    useVerifyEmailMutation,
    useGetMeMutation} = authApiSlice;