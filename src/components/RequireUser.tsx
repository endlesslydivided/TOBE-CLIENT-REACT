import { useCookies } from 'react-cookie';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { IUser } from '../models/IUser';
import { userApi } from '../services/UserService';
import FullScreenLoader from './FullScreenLoader';

const RequireUser = ({ allowedRoles }: { allowedRoles: string[] }) => 
{
  const [cookies] = useCookies(['logged_in']);
  const location = useLocation();

  const { isLoading, isFetching } = userApi.endpoints.getMe.useQuery(null, {skip: false,refetchOnMountOrArgChange: true,});

  const loading = isLoading || isFetching;

  const userState = userApi.endpoints.getMe.useQueryState(null, {selectFromResult: (data) => data});

  if (loading) 
  {
    return <FullScreenLoader />;
  }

  return (cookies.logged_in || userState) && allowedRoles.includes(userState?.data?.role as string) ? (<Outlet />) 
  : 
  cookies.logged_in && userState ? (<Navigate to='/unauthorized' state={{ from: location }} replace />) 
  : 
  (<Navigate to='/login' state={{ from: location }} replace />);
};

export default RequireUser;

