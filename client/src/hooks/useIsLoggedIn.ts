import { useState, useEffect } from 'react';

const useIsLoggedIn = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('accessToken') ? true : false);

  useEffect(() => {
    const handleStorageChange = () => {
      setIsLoggedIn(localStorage.getItem('accessToken') ? true : false);
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  console.log('XD');

  return isLoggedIn;
};

export default useIsLoggedIn;