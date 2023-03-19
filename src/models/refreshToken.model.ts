import mongoose, { Schema, Document, Types } from 'mongoose'

export interface IRefreshTokenSchema extends Document {
  _user: Types.ObjectId;
  token: string;
  expiresAt: Date
};

const refreshTokenSchema: Schema = new Schema({
  _user: {
    type: Types.ObjectId,
    ref: 'User'
  },
  token: {
    type: String
  },
  expiresAt: {
    type: Date
  }
}, {
  timestamps: true
});

export const RefreshTokenSchema = mongoose.model<IRefreshTokenSchema>('RefreshToken', refreshTokenSchema);