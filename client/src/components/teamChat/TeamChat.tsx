import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import io, { Socket } from 'socket.io-client';

const socket = io('http://localhost:5000');

const TeamChat = (): JSX.Element => {
  const [messages, setMessages] = useState<string[]>([]);
  const [input, setInput] = useState('');
  const [room, setRoom] = useState('default');

  useEffect(() => {
    socket.on('message', (message) => {
      setMessages((messages) => [...messages, message]);
    });

    return () => {
      socket.off('message');
    };
  }, []);

  const sendMessage = () => {
    if (input.trim() !== '') {
      socket.emit('message', room, input);
      setInput('');
    }
  };

  return (
    <div>
      <h1>Chat Room</h1>
      <div>
        <label htmlFor="room">Room:</label>
        <input
          id="room"
          type="text"
          value={room}
          onChange={(e) => setRoom(e.target.value)}
        />
      </div>
      <div>
        {messages.map((message, index) => (
          <div key={index}>{message}</div>
        ))}
      </div>
      <div>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
};

export default TeamChat;