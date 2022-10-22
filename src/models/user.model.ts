import mongoose, { Schema, Document } from 'mongoose';

export type IGame = {
  title?: string;
  rank?: string;
  position?: string;
};

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
    type: [{
      name: {
        type: String
      },
      rank: {
        type: String
      },
      additionalInfo: {
        type: String
      }
    }]
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