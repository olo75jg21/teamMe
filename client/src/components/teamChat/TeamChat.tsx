import React, { useEffect, useRef, useState } from "react";
import io, { Socket } from "socket.io-client";
import { useNavigate, useParams } from "react-router-dom";
import useGetLoggedUserData from "../../hooks/useGetLoggedUserData";
import axiosInstance from "../../plugins/axios";
import { ITeam } from "../../types/team";
import { IUser } from "../../types/user";
import Chat from "./Chat";
import Header from "../header/Header";

const socket: Socket = io("http://localhost:5000"); // Replace 'http://your-server-url' with your Socket.IO server URL

const TeamChat: React.FC = () => {
  const { userData } = useGetLoggedUserData();
  const senderId = userData.user._id;

  const navigate = useNavigate();

  const doUserBelongToTeamAndIsLogged = () => {
    if (userData.accessToken === "") {
      navigate("/");
      return;
    }

    return true;
  };

  return doUserBelongToTeamAndIsLogged() ? (
    <div>
      <Header />
      <Chat />
    </div>
  ) : (
    <div>You dont belong to team</div>
  );
};

export default TeamChat;
