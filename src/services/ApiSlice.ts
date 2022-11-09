import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/dist/query/react"
import { Cookies, useCookies } from "react-cookie";
import { logOut, setCredentials } from "../store/reducers/AuthSlice";

const baseQuery = fetchBaseQuery({
    baseUrl: process.env.REACT_APP_API_URL,
    credentials:'include',
    prepareHeaders: (headers,{getState}: any) =>
    {
        const token = getCookie('accessToken');
        if(token)
        {
            headers.set("authorization",`Bearer ${token}`);
        }
        return headers;
    }
});

const baseQueryWithReauth = async(args : any,api : any,extraOptions : any) =>
{
    let result = await baseQuery(args,api,extraOptions);
    
    if(result?.error?.status === 403)
    {
        console.log('sending refresh token');

        const refreshResult = await baseQuery({
            url:'/auth/refresh',
            method:'GET'
        },api,extraOptions);
        console.log(refreshResult);

        if(refreshResult?.data)
        {
            const user = api.getState().auth.user;
            api.dispatch(setCredentials({...refreshResult.data,user}));
        
            result = await baseQuery(args,api,extraOptions);
        }   
        else
        {
            const logoutResult = await baseQuery({
                url:'/auth/logout',
                method:'GET',
                body: api.getState().auth.user
            },api,extraOptions);

            api.dispatch(logOut());

        }    
    }

    return result;
}


const getCookie = (cName:string) =>
{
    const name = cName + "=";
    const cDecoded = decodeURIComponent(document.cookie);
    const cArr = cDecoded.split('; ');
    let result;
    cArr.forEach(val => {
      if (val.indexOf(name) === 0) result = val.substring(name.length);
    })
    return result;
}

export const apiSlice = createApi({
    baseQuery:  baseQueryWithReauth,
    endpoints:(builder)=> ({

    })
}) 

