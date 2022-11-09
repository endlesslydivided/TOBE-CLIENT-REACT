import React, {useContext} from 'react'
import{Routes,Route} from 'react-router-dom'
import AdminPage from '../pages/AdminPage';
import ProfilePage from '../pages/ProfilePage';
import AuthPage from '../pages/AuthPage';
import UnauthorizePage from '../pages/UnauthorizePage';
import EmailVerificationPage from '../pages/VerifyEmailPage';
import Layout from './Layout';
import RequireRole from './RequireRole';

const AppRouter = () => {

  return (
    <Routes>     
       <Route path='/' element={<Layout />}>
          {/* Private Route */}
          <Route element={<RequireRole allowedRoles={['USER', 'ADMIN']} />}>
            <Route path='profile' element={<ProfilePage />} />
          </Route>

          <Route element={<RequireRole allowedRoles={['USER']} />}>
            <Route path='admin' element={<AdminPage />} />
          </Route>

          <Route index element={<UnauthorizePage />} />

        </Route>

        <Route path='verifyemail' element={<EmailVerificationPage />}/>

        <Route path='login' element={<AuthPage form='login' />} >
          <Route path=':action' element={<AuthPage form='login' />} />
        </Route>

        <Route path='register' element={<AuthPage form='register'/>} />
    </Routes>
  )
};

export default AppRouter