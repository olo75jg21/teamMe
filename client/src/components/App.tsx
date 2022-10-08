import { BrowserRouter, Routes, Route } from 'react-router-dom';

import '../index.css';
import { Account } from './account/Account';
import AddOffertPage from './addOffert/AddOffertPage';

import ContactPage from './ContactPage';
import ErrorPage from "./ErrorPage";
import Header from './header/Header';
import LandingPage from './landing/LandingPage';
import LoginPage from './login/LoginPage';
import RegisterPage from './register/RegisterPage';

export const App = (): JSX.Element => {
  return (
    <div className='box-border'>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path='/' element={<LandingPage />} />
          <Route path='/register' element={<RegisterPage />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/newoffert' element={<AddOffertPage />} />
          <Route path='/contact' element={<ContactPage />} />
          <Route path='/account' element={<Account />}/>
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};