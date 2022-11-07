import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/dist/query/react"
import { IGenericResponse, IUser } from "../models/IUser"
import { LoginInput } from "../pages/LoginPage";
import { RegisterInput } from "../pages/RegisterPage";
import { userApi } from "./UserService";

const BASE_URL = process.env.REACT_APP_API_URL as string;


export const authAPI = createApi({

    reducerPath: 'authAPI',

    baseQuery: fetchBaseQuery({baseUrl:`${BASE_URL}/auth/`}),

    endpoints:(build)=>
    ({
        register: build.mutation<IGenericResponse,RegisterInput>
        ({
            query: (data) =>(
                {
                    url: '/registration',
                    method:'POST',
                    body: data
                }
            )
        }),
        
        login: build.mutation<{access_token: string; status: string },LoginInput>
        ({
            query: (data) =>(
                {
                    url: '/login',
                    method:'POST',
                    body: data,
                    credentials: 'include',
                }
            ),
            async onQueryStarted(args, { dispatch, queryFulfilled }) 
            {
                try 
                {
                  await queryFulfilled;
                  await dispatch(userApi.endpoints.getMe.initiate(null));
                } catch (error) 
                {}
            },
        }),

        verifyEmail: build.mutation<IGenericResponse,{ verificationCode: string }>
        ({
            query({ verificationCode }) 
            {
            return {
                url: `/verifyemail/${verificationCode}`,
                method: 'GET',
            };
            },
        }),

        logout: build.mutation<void, void>
        ({
            query() {
              return {
                url: '/logout',
                credentials: 'include',
              };
            },
          }),
      })
})

export const {
    useLoginMutation,
    useRegisterMutation,
    useLogoutMutation,
    useVerifyEmailMutation,
  } = authAPI;