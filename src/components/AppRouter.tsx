import React, {useContext} from 'react'
import{Routes,Route} from 'react-router-dom'
import AdminPage from '../pages/AdminPage';
import LoginPage from '../pages/LoginPage';
import ProfilePage from '../pages/ProfilePage';
import AuthPage from '../pages/AuthPage';
import UnauthorizePage from '../pages/UnauthorizePage';
import EmailVerificationPage from '../pages/VerifyEmailPage';
import Layout from './Layout';
import RequireUser from './RequireUser';

const AppRouter = () => {

  return (
    <Routes>     
       <Route path='/' element={<Layout />}>
          {/* Private Route */}
          <Route element={<RequireUser allowedRoles={['user', 'admin']} />}>
            <Route path='profile' element={<ProfilePage />} />
          </Route>

          <Route element={<RequireUser allowedRoles={['admin']} />}>
            <Route path='admin' element={<AdminPage />} />
          </Route>

          <Route index element={<UnauthorizePage />} />

        </Route>

        <Route path='verifyemail' element={<EmailVerificationPage />}>
          <Route path=':verificationCode' element={<EmailVerificationPage />} />
        </Route>

        <Route path='login' element={<AuthPage form='login' />} >
          <Route path=':action' element={<AuthPage form='login' />} />
        </Route>

        <Route path='register' element={<AuthPage form='register'/>} />
    </Routes>
  )
};

export default AppRouter