
// import { setUser } from '../store/reducers/UserSlice';
// import { apiSlice } from './AuthSlice';


// export const userApiSlice = apiSlice.injectEndpoints({
//   endpoints: (builder) => 
//   ({
//     getMe: builder.query<any, null>
//     ({
//       query() {
//         return {
//           url: 'me',
//           credentials: 'include',
//         };
//       },
//       transformResponse: (result: { data: { user: any } }) =>
//         {
//           console.log(result);
//           return result.data.user;
//         },
//       async onQueryStarted(args, { dispatch, queryFulfilled }) {
//         try 
//         {
//           const { data } = await queryFulfilled;
//           console.log(data);

//           dispatch(setUser(data));
//         } 
//         catch (error) {
//           console.warn(error);

//         }
//       },
//     }),
//   }),
// });

export{}