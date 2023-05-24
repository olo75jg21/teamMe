import React, { useEffect, useState } from 'react';
import io, { Socket } from 'socket.io-client';
import { useNavigate, useParams } from 'react-router-dom';
import useGetLoggedUserData from '../../hooks/useGetLoggedUserData';
import axiosInstance from '../../plugins/axios';
import { ITeam } from '../../types/team';
import { IUser } from '../../types/user';
import Header from '../header/Header';
import { MdMessage } from 'react-icons/md';
import { IoMdSend } from 'react-icons/io';

const socket: Socket = io('http://localhost:5000'); // Replace 'http://your-server-url' with your Socket.IO server URL

interface IMessage {
  sender: IUser;
  message: string;
};

const TeamChat: React.FC = () => {
  const [team, setTeam] = useState<ITeam>();
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [messageInput, setMessageInput] = useState<string>('');

  const { id: roomId } = useParams<{ id: string }>(); // Get the room ID from the URL parameter

  const { userData } = useGetLoggedUserData();
  const senderId = userData.user._id;

  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        const { data, status } = await axiosInstance.get(`team/${roomId}`);
        if (status === 200) {
          // console.log(data);
          setTeam(data)
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
    // Listen for 'message' event from the server
    socket.on('message', (receivedRoom: string, chatData: IMessage[]) => {
      if (receivedRoom === roomId) {
        console.log(chatData);
        // Update the messages state with the new chat data
        setMessages(chatData);
      }
    });

    // Join the room on component mount
    socket.emit('join', roomId);

    // Clean up event listener and leave the room on component unmount
    return () => {
      socket.off('message');
      socket.emit('leave', roomId);
    };
  }, [roomId]);

  const handleSendMessage = () => {
    // Emit 'message' event to the server with the room ID and message content
    socket.emit('message', roomId, messageInput, senderId);

    // Clear the message input
    setMessageInput('');
  };

  const isUserCreatorOfMessage = (senderId: string) => {
    if (!team) { return; }
    return userData.user._id === senderId;
  };

  const doUserBelongToTeamAndIsLogged = () => {
    if (userData.accessToken === '') {
      navigate('/');
      return;
    };

    if (!team) return;

    const isUserTeamOwner = team._user._id === userData.user._id;
    const isUserApplicant = team.applicants.some((obj => obj._user._id === userData.user._id && obj.status === 'accepted'));

    return isUserApplicant || isUserTeamOwner;
  };

  return (
    doUserBelongToTeamAndIsLogged() ?
      <div>
        <Header />
        <div className='bg-gray-800 pt-20 h-screen'>
          <div className="flex p:2 sm:p-6 justify-between flex h-3/4 flex-col w-3/4 bg-gray-700 mx-auto">
            <div className="flex sm:items-center justify-between py-3 border-b-2 border-gray-200">
              <div className="relative flex items-center space-x-4">
                <div className="relative">
                  gameImage
                </div>
                <div className="flex flex-col leading-tight">
                  <div className="text-2xl mt-1 flex items-center">
                    <span className="text-gray-200 mr-3">Team name</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col space-y-4 p-3 overflow-x-hidden overflow-y-auto scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch whitespace-normal">

              {messages.map((message, index) => (
                <div key={index}>
                  {isUserCreatorOfMessage(message.sender._id) ? (
                    <div className="chat-message">
                      <div className="flex items-end justify-end">
                        <div className="flex flex-col space-y-2 text-xs max-w-xs mx-2 order-1 items-end">
                          <div>
                            <span className="px-4 py-2 rounded-lg inline-block rounded-br-none bg-blue-600 text-white flex-grow break-all">
                              {message.message}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="chat-message">
                      <div className="flex items-end">
                        <div className="flex flex-col space-y-2 text-xs max-w-xs mx-2 order-2 items-start">
                          <div>
                            <span className="px-4 py-2 rounded-lg inline-block bg-gray-300 text-gray-600 flex-grow break-all">
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

            <div className="border-t-2 border-gray-200 px-4 pt-4 mb-2 sm:mb-0">
              <div className="relative flex">

                <span className="absolute inset-y-0 flex items-center">
                  <button type="button" className="inline-flex items-center justify-center rounded-full h-12 w-12 transition duration-500 ease-in-out text-gray-500 hover:bg-gray-300 focus:outline-none">
                    <MdMessage className='text-2xl' />
                  </button>
                </span>

                <input
                  type="text"
                  placeholder="Write your message!"
                  className="w-full focus:outline-none focus:placeholder-gray-400 text-gray-600 placeholder-gray-600 pl-12 bg-gray-200 rounded-md py-3"
                  value={messageInput}
                  onChange={(e) => setMessageInput(e.target.value)}
                />

                <div className="absolute right-0 items-center inset-y-0 hidden sm:flex">
                  <button
                    type="button"
                    className="inline-flex items-center justify-center rounded-lg px-4 py-3 transition duration-500 ease-in-out text-white bg-blue-500 hover:bg-blue-400 focus:outline-none"
                    onClick={handleSendMessage}
                  >
                    <span className="font-bold">Send</span>
                    <IoMdSend className='ml-2 text-2xl' />
                  </button>
                </div>

              </div>
            </div>
          </div>
        </div>

      </div >
      : <div>You dont belong to team</div>
  );
};

export default TeamChat;