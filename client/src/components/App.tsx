import { BrowserRouter, Routes, Route } from "react-router-dom";

import "../index.css";
import { Account } from "./account/Account";
import AddTeamPage from "./team/addTeam/AddTeamPage";

import ErrorPage from "./ErrorPage";
import LandingPage from "./landing/LandingPage";
import LoginPage from "./auth/login/LoginPage";
import RegisterPage from "./auth/register/RegisterPage";
import TeamDetails from "./team/teamDetails/TeamDetails";
import TeamChat from "./teamChat/TeamChat";
import AdminDashboard from "./adminDashboard/AdminDashboard";

export const App = (): JSX.Element => {
  return (
    <div className="box-border">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/management/dashboard" element={<AdminDashboard />} />
          <Route path="/newteam" element={<AddTeamPage />} />
          <Route path="/teamDetails/:id" element={<TeamDetails />} />
          <Route path="/teamChat/:id" element={<TeamChat />} />
          <Route path="/account" element={<Account />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};
