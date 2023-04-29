import { BrowserRouter, Routes, Route } from 'react-router-dom';

import '../index.css';
import { Account } from './account/Account';
import { AddOfferPage } from './addOffer/AddOfferPage';

import ContactPage from './ContactPage';
import ErrorPage from "./ErrorPage";
import LandingPage from './landing/LandingPage';
import LoginPage from './login/LoginPage';
import RegisterPage from './register/RegisterPage';
import OfferDetails from './offer/offerDetails/OfferDetails';

export const App = (): JSX.Element => {

  return (
    <div className='box-border'>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<LandingPage />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/register' element={<RegisterPage />} />
          <Route path='/newoffer' element={<AddOfferPage />} />
          <Route path='/offerDetails/:id' element={<OfferDetails />} />
          <Route path='/contact' element={<ContactPage />} />
          <Route path='/account' element={<Account />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};