import React, {useEffect} from 'react'
import{Routes,Route, RouteProps,useLocation, Navigate, createBrowserRouter} from 'react-router-dom'
import { useAppSelector } from '../hooks/redux';
import { useGetMeQuery } from '../services/AuthApiSlice';
import {setCredentials } from '../store/reducers/AuthSlice';
import FullScreenLoader from './FullScreenLoader'
import { anonymousRoutesManager, roleRoutesManager } from '../utils/routes';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import Layout from '../layouts/dashboard/DashboardLayout';
import ProfilePage from '../pages/ProfilePage';
import { ALBUM_ROUTE, CHAT_ROUTE, FEED_ROUTE, USERS_ROUTE, LOGIN_ROUTE, PROFILE_ROUTE, REGISTRATION_ROUTE } from '../utils/consts';
import UnauthorizePage from '../pages/UnauthorizePage';
import UsersList from '../sections/usersList/UsersList';
import UsersPage from '../pages/UsersPage';
import ChatPage from '../pages/ChatPage';
import FeedPage from '../pages/FeedPage';
import AlbumsPage from '../pages/AlbumsPage';
import UserPage from '../pages/UserPage';
import DialogPage from '../pages/DialogPage';


const AppRouter = () => {

  const {data:userData,isLoading,isError} = useGetMeQuery();
  const dispatch = useDispatch();
  const user :any = useAppSelector(state => state?.auth?.user);


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
          <Route path={"/user" + CHAT_ROUTE} element={<ChatPage/>}/>
          <Route path={`/user/${CHAT_ROUTE}/:id`} element={<DialogPage/>}/>
          <Route path={"/user" + USERS_ROUTE} element={<UsersPage/>}/>
          <Route path={`/user${USERS_ROUTE}/${user.id}`} element={<Navigate to={"/user" +  PROFILE_ROUTE} replace/>}/>
          <Route path={`/user${USERS_ROUTE}/:id`} element={<UserPage/>}/>
          <Route path={"/user" + FEED_ROUTE} element={<FeedPage/>}/>
          <Route path={"/user" +  ALBUM_ROUTE} element={<AlbumsPage/>}/>
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