import useGetLoggedUserData from "../../hooks/useGetLoggedUserData";
import LoginPage from "../auth/login/LoginPage";
import Header from "../header/Header";
import AsideTabs from "./asideTabs/AsideTabs";

const AdminDashboard = (): JSX.Element => {
  const { userData } = useGetLoggedUserData();
  const isUserLoggedAdmin: boolean =
    userData.accessToken !== "" && userData.user.role === "admin";

  return !isUserLoggedAdmin ? (
    <LoginPage />
  ) : (
    <div className="h-screen bg-gray-800">
      <Header />
      <AsideTabs />
    </div>
  );
};

export default AdminDashboard;
