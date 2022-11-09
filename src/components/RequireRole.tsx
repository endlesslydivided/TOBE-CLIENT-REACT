import { useSelector } from 'react-redux';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { selectCurrentToken, selectCurrentUser } from '../store/reducers/AuthSlice';

const RequireRole = ({ allowedRoles }: { allowedRoles: string[] }) => 
{
  const token = useSelector(selectCurrentToken);
  const user = useSelector(selectCurrentUser);

  const location = useLocation();
  

  return (token) && allowedRoles.some( role => ((user?.roles as object[]).some( (x: any)=> x.name === role) )) ? (<Outlet />) 
  : 
  user ? (<Navigate to='/' state={{ from: location }} replace />) 
  : 
  (<Navigate to='/login' state={{ from: location }} replace />);
};

export default RequireRole;

