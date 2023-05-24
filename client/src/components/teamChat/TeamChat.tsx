import React, { useEffect, useState } from 'react';
import io, { Socket } from 'socket.io-client';
import { useNavigate, useParams } from 'react-router-dom';
import useGetLoggedUserData from '../../hooks/useGetLoggedUserData';
import axiosInstance from '../../plugins/axios';
import { ITeam } from '../../types/team';
import { IUser } from '../../types/user';

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
      <div className="p-4">
        <div className="mb-4 h-64 border border-gray-300 overflow-y-scroll">
          {messages.map((message, index) => (
            <div key={index}>
              <span>{message.sender.username}: </span>
              <span>{message.message}</span>
            </div>
          ))}
        </div>
        <div className="flex">
          <input
            type="text"
            className="flex-grow p-2 border border-gray-300 rounded-l"
            placeholder="Type your message..."
            value={messageInput}
            onChange={(e) => setMessageInput(e.target.value)}
          />
          <button
            className="p-2 bg-blue-500 text-white rounded-r"
            onClick={handleSendMessage}
          >
            Send
          </button>
        </div>
      </div>
      : <div>You dont belong to team</div>
  );
};

export default TeamChat;