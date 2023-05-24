import { Server as SocketIOServer, Socket } from 'socket.io';

const initializeChat = (server: SocketIOServer): void => {
  const io: SocketIOServer = server;

  io.on('connection', (socket: Socket) => {
    console.log('New user connected');

    socket.on('join', (room: string) => {
      socket.join(room);
      console.log(`User joined room ${room}`);
    });

    socket.on('message', (room: string, message: string) => {
      console.log('message:', message);
      console.log('room:', room);
      // console.log(room);
      io.to(room).emit('message', room, message);
    });

    socket.on('disconnect', () => {
      console.log('User disconnected');
    });
  });
}

export default initializeChat;