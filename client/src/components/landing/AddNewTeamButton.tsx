import { NavLink } from "react-router-dom";

const AddNewTeamButton = (): JSX.Element => {
  return (
    <NavLink
      className="mx-5 mb-7 mt-6 flex h-12 cursor-pointer items-center justify-center rounded-lg bg-indigo-800 text-xl font-bold text-gray-100 duration-200 hover:bg-indigo-500"
      to={"/newteam"}
    >
      Add new team
    </NavLink>
  );
};

export default AddNewTeamButton;
