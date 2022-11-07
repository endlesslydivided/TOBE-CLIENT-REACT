import React, {useContext} from 'react'
import{Routes,Route} from 'react-router-dom'
import AdminPage from '../pages/AdminPage';
import LoginPage from '../pages/LoginPage';
import ProfilePage from '../pages/ProfilePage';
import RegisterPage from '../pages/RegisterPage';
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

        <Route path='login' element={<LoginPage />} />

        <Route path='register' element={<RegisterPage />} />
    </Routes>
  )
};

export default AppRouter