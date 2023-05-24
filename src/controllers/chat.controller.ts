import { Server as SocketIOServer, Socket } from 'socket.io';
import { TeamModel } from '../models/team.model';
import { Types } from 'mongoose';

const initializeChat = (server: SocketIOServer): void => {
  const io: SocketIOServer = server;

  io.on('connection', (socket: Socket) => {
    console.log('New user connected');

    socket.on('join', (room: string) => {
      socket.join(room);
      console.log(`User joined room ${room}`);
    });

    socket.on('message', async (room: string, message: string, senderId: string) => {

      // Save the chat message to the database
      try {
        const team = await TeamModel.findOne({ _id: room }).populate('chat.sender');

        if (!team) {
          console.log('Team not found');
          return;
        }

        // Check if the senderId is the team creator's ID or any of the applicants' IDs
        const isValidSender = team._user.toString() === senderId || team.applicants.some(applicant => applicant._user.toString() === senderId);
        if (!isValidSender) {
          console.log('Unauthorized sender');
          return;
        }

        // Save the chat message to the database
        const newChatMessage = {
          sender: new Types.ObjectId(senderId.toString()),
          message: message,
          createdAt: new Date(),
        };

        team.chat.push(newChatMessage);

        await team.populate('chat.sender');

        await team.save();

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