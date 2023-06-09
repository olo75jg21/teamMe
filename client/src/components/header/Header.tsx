import { NavLink } from "react-router-dom";

import { HeaderItem } from "./HeaderItem";
import { LogoutButton } from "./LogoutButton";
import useGetLoggedUserData from "../../hooks/useGetLoggedUserData";

const Header = (): JSX.Element => {
  const { userData } = useGetLoggedUserData();

  const renderUserRoleHeaderNavigation = () => {
    return (
      <>
        <HeaderItem route={"/account"} text={"Account"} />
        <HeaderItem route={"/newteam"} text={"New Team"} />

        <LogoutButton />
      </>
    );
  };

  const renderAdminHeaderNavigation = (): JSX.Element => {
    return userData.user.role === "admin" ? (
      <>
        <HeaderItem route={"/management/dashboard"} text={"Admin"} />
      </>
    ) : (
      <></>
    );
  };

  return (
    <div className="sticky top-0 z-50">
      <nav className="bg-gradient-to-r from-violet-700 to-violet-500">
        <div className="container mx-auto flex flex-wrap items-center justify-between">
          <NavLink
            to="/"
            className="font-mono text-4xl font-bold tracking-widest text-slate-100"
          >
            TeamMe
          </NavLink>
          <div className="w-full md:block md:w-auto">
            <ul
              className="mt-4 flex flex-col p-4 hover:text-slate-50 md:mt-0 md:flex-row md:space-x-8 md:border-0 
              md:text-sm md:font-medium"
            >
              {renderAdminHeaderNavigation()}
              {renderUserRoleHeaderNavigation()}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Header;
