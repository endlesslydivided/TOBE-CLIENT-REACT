import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/dist/query/react"
import { Cookies, useCookies } from "react-cookie";
import { logOut, setCredentials } from "../store/reducers/AuthSlice";

const baseQuery = fetchBaseQuery({
    baseUrl: process.env.REACT_APP_API_URL,
    credentials:'include',
    // prepareHeaders: (headers: any) =>
    // {
    //     const token = localStorage.getItem('accessToken');
    //     if(token)
    //     {
    //         headers.set("authorization",`Bearer ${token}`);
    //     }
    //     return headers;
    // }
});

const baseQueryWithReauth = async(args? : any,api? : any,extraOptions? : any) =>
{
    let result = await baseQuery(args,api,extraOptions);
    
    if(result?.error?.status === 403)
    {
        console.log('sending refresh token');

        const refreshResult:any = await baseQuery({
            url:'/auth/refresh',
            method:'GET'
        },api,extraOptions);
        console.log(refreshResult);

        if(refreshResult.meta.response.status === 200)
        {
           result = await baseQuery(args,api,extraOptions);
        }   
        else
        {
            const logoutResult = await baseQuery({
                url:'/auth/logout',
                method:'GET'
            },api,extraOptions);
            api.dispatch(logOut());

        }    
    }

    return result;
}

export const apiSlice = createApi({
    baseQuery:  baseQueryWithReauth,
    tagTypes:['Post',
              'Photo',
              'Friend',
              'FriendsRequest',
              'AvoidedRequest',
              'User',
              'CurrentUser',
              'Album',
              'Photo',
              'Feed'],
    endpoints:(builder)=> ({

    })
}) 

