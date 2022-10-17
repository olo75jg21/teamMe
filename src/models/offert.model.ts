import mongoose, { Schema, Document } from 'mongoose';

export interface IOffert extends Document {
  _user: any,
  game: string,
  description: string,
  rank: string,
};

const offertModel: Schema = new Schema({
  _user: {
    type: String,
    ref: 'User'
  },
  game: {
    type: String
  },
  description: {
    type: String
  },
  rank: {
    type: String
  }
}, {
  timestamps: true
});

export const OffertModel = mongoose.model<IOffert>('Offert', offertModel);