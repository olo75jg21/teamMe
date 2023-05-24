import { Server as SocketIOServer, Socket } from 'socket.io';
import { TeamModel } from '../models/team.model';

const initializeChat = (server: SocketIOServer): void => {
  const io: SocketIOServer = server;

  io.on('connection', (socket: Socket) => {
    console.log('New user connected');

    socket.on('join', (room: string) => {
      socket.join(room);
      console.log(`User joined room ${room}`);
    });

    socket.on('message', async (room: string, message: string, senderId: string) => {
      console.log(room);
      console.log(message);
      console.log(senderId);

      // Save the chat message to the database
      try {
        const team = await TeamModel.findOneAndUpdate(
          { _id: room },
          {
            $push: {
              chat: {
                sender: senderId,
                message: message,
              },
            },
          },
          { new: true }
        );

        if (!team) {
          console.log('Team not found');
          return;
        }

        // Emit the message to all clients in the room, including the updated chat data
        io.to(room).emit('message', room, team.chat);
      } catch (error) {
        console.log('Error saving chat message:', error);
      }
    });

    socket.on('disconnect', () => {
      console.log('User disconnected');
    });
  });
}

export default initializeChat;