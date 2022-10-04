import mongoose, { Schema, Document } from 'mongoose';

import { GameSchema, IGame } from './game.model';

export interface IUser extends Document {
  email: string;
  username: string;
  password: string;
  languages: string[];
  age: number;
  description: string;
  games: IGame[];
};

const UserSchema: Schema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  username: {
    type: String,
  },
  password: {
    type: String,
    required: true
  },
  games: {
    type: [GameSchema]
  }
}, {
  timestamps: true
});

export const UserModel = mongoose.model<IUser>('User', UserSchema);