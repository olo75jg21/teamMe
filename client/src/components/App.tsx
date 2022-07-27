import { BrowserRouter, Routes, Route } from 'react-router-dom';

import '../index.css';

import RegisterPage from './RegisterPage';
import ErrorPage from "./ErrorPage";

export const App = (): JSX.Element => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<div> <p>eoeo</p> </div>} />
          <Route path='/register' element={<RegisterPage />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};