import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import useGetLoggedUserData from "../../hooks/useGetLoggedUserData";
import axios from "../../plugins/axios";

export const LogoutButton = (): JSX.Element => {
  const { userData } = useGetLoggedUserData();
  const navigate = useNavigate();
  const [isLogged, setIsLogged] = useState(
    !!localStorage.getItem("accessToken")
  );

  const handleLogout = async () => {
    try {
      const { status } = await axios.post("/auth/logout", {
        userId: userData.user._id,
        refreshToken: userData.refreshToken,
      });
      if (status === 200) {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("userData");
        setIsLogged(false);
        navigate("/login");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return isLogged ? (
    <NavLink
      to="/"
      onClick={handleLogout}
      className="block py-2 pl-3 pr-4 text-xl text-gray-400 text-slate-300 duration-200 hover:text-white 
        hover:underline hover:underline-offset-8 md:p-2 md:hover:bg-transparent"
    >
      Logout
    </NavLink>
  ) : (
    <></>
  );
};
