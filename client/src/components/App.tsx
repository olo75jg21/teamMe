import { BrowserRouter, Routes, Route } from 'react-router-dom';

import '../index.css';

import ContactPage from './ContactPage';
import ErrorPage from "./ErrorPage";
import Header from './Header';
import LandingPage from './LandingPage';
import LoginPage from './LoginPage';
import RegisterPage from './RegisterPage';

export const App = (): JSX.Element => {
  return (
    <div className='box-border'>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path='/' element={<LandingPage />} />
          <Route path='/register' element={<RegisterPage />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/contact' element={<ContactPage />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};