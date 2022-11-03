import React, {useContext} from 'react'
import{Routes,Route} from 'react-router-dom'
import {auhtRoutes,publicRoutes,auhtAdminRoutes, anonymousRoute} from '../routes'


const AppRouter = () => {

  const {user} = useContext(Context);

  return (
    <Routes>     
      {
        user.isAuth && user.user.role === 'ADMIN' && auhtAdminRoutes.map(
          ({path,Component}) =>      
          <Route key={path} path={path} element={<Component/>} exact/>
          
        )      
        }
    </Routes>
  )
};

export default AppRouter