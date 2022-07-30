import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  email: string;
  username: string;
  password: string;
}

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
  }
}, {
  timestamps: true
});

export const UserModel = mongoose.model<IUser>('User', UserSchema);