import mongoose, { Schema, Document } from 'mongoose';

import { GameSchema, IGame } from './game.model';

export interface IUser extends Document {
  age: number;
  description: string;
  email: string;
  games: IGame[];
  language: string[];
  password: string;
  username: string;
};

const UserSchema: Schema = new Schema({
  age: {
    type: Number,
  },
  description: {
    type: String
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  games: {
    type: [GameSchema]
  },
  language: {
    type: [String]
  },
  password: {
    type: String,
    required: true
  },
  username: {
    type: String,
  },
}, {
  timestamps: true
});

export const UserModel = mongoose.model<IUser>('User', UserSchema);