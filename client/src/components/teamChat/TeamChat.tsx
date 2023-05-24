import React, { useEffect, useState } from 'react';
import io, { Socket } from 'socket.io-client';
import { useParams } from 'react-router-dom';

const socket: Socket = io('http://localhost:5000'); // Replace 'http://your-server-url' with your Socket.IO server URL

const TeamChat: React.FC = () => {
  const [messages, setMessages] = useState<string[]>([]);
  const [messageInput, setMessageInput] = useState('');
  const { id: roomId } = useParams<{ id: string }>(); // Get the room ID from the URL parameter

  useEffect(() => {
    // Listen for 'message' event from the server
    socket.on('message', (room: string, message: string) => {
      console.log(room);
      console.log(message);
      setMessages((prevMessages) => [...prevMessages, message]);
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
    socket.emit('message', roomId, messageInput);

    // Clear the message input
    setMessageInput('');
  };

  return (
    <div className="p-4">
      <div className="mb-4 h-64 border border-gray-300 overflow-y-scroll">
        {messages.map((message, index) => (
          <div key={index} className="p-2 border-b border-gray-300">
            <p>{message}</p>
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
  );
};

export default TeamChat;