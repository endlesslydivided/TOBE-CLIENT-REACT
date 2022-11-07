import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IUser } from '../models/IUser';
import { setUser } from '../store/reducers/UserSlice';

const BASE_URL = process.env.REACT_APP_SERVER_ENDPOINT as string;

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${BASE_URL}/users/`,
  }),
  tagTypes: ['User'],
  endpoints: (builder) => 
  ({
    getMe: builder.query<IUser, null>
    ({
      query() {
        return {
          url: 'me',
          credentials: 'include',
        };
      },
      transformResponse: (result: { data: { user: IUser } }) =>
        result.data.user,
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try 
        {
          const { data } = await queryFulfilled;
          dispatch(setUser(data));
        } 
        catch (error) {}
      },
    }),
  }),
});
