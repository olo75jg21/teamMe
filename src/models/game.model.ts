import mongoose, { Schema, Document } from 'mongoose';

export interface IGame extends Document {
  title: string;
  rank: string;
  position?: string;
};

export const GameSchema: Schema = new Schema({
  title: {
    type: String
  },
  rank: {
    type: String
  },
  position: {
    type: String
  },
});

export const GameModel = mongoose.model<IGame>('Game', GameSchema);