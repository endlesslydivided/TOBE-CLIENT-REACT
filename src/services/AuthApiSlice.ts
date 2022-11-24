import { logOut, setCredentials } from "../store/reducers/AuthSlice";
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
            invalidatesTags: ['CurrentUser']    
        }),

        logout: builder.mutation<void,void>({
            query: () => ({
                url: '/auth/logout',
                method: 'GET',
                credentials: 'include',
            }),
            invalidatesTags: ['CurrentUser']    
        }),
        getMe: builder.query<any,void>({
            query: () => ({
                url: '/auth/me',
                method: 'GET',
                credentials: 'include',
            }),
            providesTags: ['CurrentUser'],
            onQueryStarted: async (id, {dispatch, queryFulfilled }) =>
            {
                try 
                {
                    const {data} = await queryFulfilled;
                    dispatch(setCredentials({...data}));
                } 
                catch (error) 
                {
                    dispatch(logOut())
                }
                
            }
        }),
    })
})





export const {
    useLoginMutation,
    useRegisterMutation,
    useLogoutMutation,
    useVerifyEmailMutation,
    useGetMeQuery} = authApiSlice;