import React, { useEffect, useRef, useState } from "react";
import io, { Socket } from "socket.io-client";
import { useNavigate, useParams } from "react-router-dom";
import useGetLoggedUserData from "../../hooks/useGetLoggedUserData";
import axiosInstance from "../../plugins/axios";
import { ITeam } from "../../types/team";
import { IUser } from "../../types/user";
import Header from "../header/Header";
import { MdMessage } from "react-icons/md";
import { IoMdSend } from "react-icons/io";

const socket: Socket = io("http://localhost:5000"); // Replace 'http://your-server-url' with your Socket.IO server URL

interface IMessage {
  sender: IUser;
  message: string;
}

const TeamChat: React.FC = () => {
  const [team, setTeam] = useState<ITeam>();
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [messageInput, setMessageInput] = useState<string>("");

  const { id: roomId } = useParams<{ id: string }>(); // Get the room ID from the URL parameter

  const { userData } = useGetLoggedUserData();
  const senderId = userData.user._id;

  const navigate = useNavigate();

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    (async () => {
      try {
        const { data, status } = await axiosInstance.get(`team/${roomId}`);
        if (status === 200) {
          // console.log(data);
          setTeam(data);
          if (messages.length === 0) {
            setMessages(data.chat);
          }
        }
      } catch (e) {
        console.error(e);
      }
    })();
  }, []);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    // Listen for 'message' event from the server
    socket.on("message", (receivedRoom: string, chatData: IMessage[]) => {
      if (receivedRoom === roomId) {
        console.log(chatData);
        // Update the messages state with the new chat data
        setMessages(chatData);
      }
    });

    // Join the room on component mount
    socket.emit("join", roomId);

    // Clean up event listener and leave the room on component unmount
    return () => {
      socket.off("message");
      socket.emit("leave", roomId);
    };
  }, [roomId]);

  const handleSendMessage = () => {
    // Emit 'message' event to the server with the room ID and message content
    socket.emit("message", roomId, messageInput, senderId);

    // Clear the message input
    setMessageInput("");
  };

  const isUserCreatorOfMessage = (senderId: string) => {
    if (!team) {
      return;
    }

    return userData.user._id === senderId;
  };

  const doUserBelongToTeamAndIsLogged = () => {
    if (userData.accessToken === "") {
      navigate("/");
      return;
    }

    if (!team) return;

    const isUserTeamOwner = team._user._id === userData.user._id;
    const isUserApplicant = team.applicants.some(
      (obj) => obj._user._id === userData.user._id && obj.status === "accepted"
    );

    return isUserApplicant || isUserTeamOwner;
  };

  return doUserBelongToTeamAndIsLogged() ? (
    <div>
      <Header />
      <div className="h-screen bg-gray-800 pt-20">
        <div className="p:2 mx-auto flex flex h-3/4 w-3/4 flex-col justify-between rounded-lg bg-gray-700 sm:p-6">
          <div className="flex justify-between border-b-2 border-gray-200 py-3 sm:items-center">
            <div className="relative flex items-center space-x-4">
              <div className="flex flex-col leading-tight">
                <div className="mt-1 flex items-center text-2xl">
                  <span className="mr-3 text-gray-200">Team name</span>
                </div>
              </div>
            </div>
          </div>

          <div
            ref={containerRef}
            className="scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch flex flex-col space-y-4 overflow-y-auto overflow-x-hidden whitespace-normal p-3"
          >
            {messages.map((message, index) => (
              <div key={index}>
                {isUserCreatorOfMessage(message.sender._id) ? (
                  <div className="chat-message">
                    <div className="flex items-end justify-end">
                      <div className="order-1 mx-2 flex max-w-xs flex-col items-end space-y-2 text-sm">
                        <div>
                          <span className="text-gray-500">you</span>
                        </div>
                        <div>
                          <span className="inline-block flex-grow break-all rounded-lg rounded-br-none bg-violet-600 px-4 py-2 text-white">
                            {message.message}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="chat-message">
                    <div className="flex items-end">
                      <div className="order-2 mx-2 flex max-w-xs flex-col items-start space-y-2 text-sm">
                        <div>
                          <span className="text-gray-400">
                            {message.sender.username}
                          </span>
                        </div>
                        <div>
                          <span className="inline-block flex-grow break-all rounded-lg bg-gray-300 px-4 py-2 text-gray-600">
                            {message.message}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="mb-2 border-t-2 border-gray-200 px-4 pt-4 sm:mb-0">
            <div className="relative flex">
              <span className="absolute inset-y-0 flex items-center">
                <button
                  type="button"
                  className="inline-flex h-12 w-12 items-center justify-center rounded-full text-gray-500 transition duration-500 ease-in-out hover:bg-gray-300 focus:outline-none"
                >
                  <MdMessage className="text-2xl" />
                </button>
              </span>

              <input
                type="text"
                placeholder="Write your message!"
                className="w-full rounded-md bg-gray-200 py-3 pl-12 text-gray-600 placeholder-gray-600 focus:placeholder-gray-400 focus:outline-none"
                value={messageInput}
                onChange={(e) => setMessageInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleSendMessage();
                  }
                }}
              />

              <div className="absolute inset-y-0 right-0 hidden items-center sm:flex ">
                <button
                  type="button"
                  className="inline-flex items-center justify-center rounded-sm bg-violet-800 px-4 py-3 text-white transition duration-500 ease-in-out hover:bg-violet-900 focus:outline-none"
                  onClick={handleSendMessage}
                >
                  <span className="font-bold">Send</span>
                  <IoMdSend className="ml-2 text-2xl" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div>You dont belong to team</div>
  );
};

export default TeamChat;
