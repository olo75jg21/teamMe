import { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';

const useIsUserLogged = () => {
    const [isLogged, setIsLogged] = useState<any>(null);
    const [cookies] = useCookies(['credentials']);

    useEffect(() => {
        setIsLogged(!!cookies.credentials);
    }, [cookies]);

    return isLogged;
};

export default useIsUserLogged;