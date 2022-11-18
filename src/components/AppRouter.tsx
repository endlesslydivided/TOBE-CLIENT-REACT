import React, {useEffect} from 'react'
import{Routes,Route, RouteProps,useLocation, Navigate, createBrowserRouter} from 'react-router-dom'
import { useAppSelector } from '../hooks/redux';
import { useGetMeMutation } from '../services/AuthApiSlice';
import {setCredentials } from '../store/reducers/AuthSlice';
import FullScreenLoader from './FullScreenLoader'
import { anonymousRoutesManager, roleRoutesManager } from '../utils/routes';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import Layout from '../layouts/dashboard/DashboardLayout';
import ProfilePage from '../pages/ProfilePage';
import { ALBUM_ROUTE, CHAT_ROUTE, FEED_ROUTE, LOGIN_ROUTE, PROFILE_ROUTE, REGISTRATION_ROUTE } from '../utils/consts';
import UnauthorizePage from '../pages/UnauthorizePage';


const AppRouter = () => {

  const [getMe, {isLoading,isError}] = useGetMeMutation();
  const dispatch = useDispatch();
  const user :any = useAppSelector(state => state?.auth?.user);

  const userDataFetching =  async () => await getMe().unwrap().then((result) =>
  {
    dispatch(setCredentials({...result}))
  })
  // .catch((error) =>
  // {
  //   // if (Array.isArray((error as any).data.error))
  //   // {
  //   //     (error as any).data.error.forEach((el: any) =>toast.error(el.message, {position: 'top-right',}));
  //   // } 
  //   // else 
  //   // {
  //   //    toast.error((error as any).data.message, {position: 'top-right',});
  //   // }
  // });
  
  useEffect(() =>
  {
      if(!user)
      {      
        userDataFetching()
      }
  },[])

  const location = useLocation();

  if(isLoading || (!user && !isError))
  {
    return <FullScreenLoader/>
  }

  return( 
    user ?
    <Routes>   
      {
        user.roles.some((role:any) => role.name === "USER") &&
        (<>
        <Route path="/user" element={<Layout/>} >
          <Route index element={<ProfilePage/>}/>
          <Route path={"/user" +  PROFILE_ROUTE} element={<ProfilePage/>}/>
          <Route path={"/user" + CHAT_ROUTE} element={<ProfilePage/>}/>
          <Route path={"/user" + FEED_ROUTE} element={<ProfilePage/>}/>
          <Route path={"/user" +  ALBUM_ROUTE} element={<ProfilePage/>}/>
        </Route>
        <Route path="*"  element={<Navigate to={"/user" +  PROFILE_ROUTE} replace/>}/>
        </>)
      }      
      {
        user.roles.some((role:any) => role.name === "ADMIN") &&
        (<><Route path="admin" element={<Layout/>} >
          <Route index element={<ProfilePage/>}/>
          </Route>
          <Route path="*"  element={<Navigate to="/user" replace/>}/></>)
      }
    </Routes>   
    :
    <Routes>
      <Route path="/">
        <Route index element={<UnauthorizePage/>}/>
        <Route path={REGISTRATION_ROUTE} element={<UnauthorizePage/>}/>
        <Route path={LOGIN_ROUTE} element={<UnauthorizePage/>}/>
        <Route path="user" element={<Navigate to="/login" replace/>} />
        <Route path="admin" element={<Navigate to="/login" replace/>} />

      </Route>
      <Route path="*"  element={<Navigate to="/" replace/>}/>
    </Routes>    
  )
};

export default AppRouter