import mongoose, { Schema, Document } from 'mongoose';

export interface IOffert extends Document {
  _user: any,
  description: string
};

const offertModel: Schema = new Schema({
  _user: {
    type: String,
    ref: 'User'
  },
  description: {
    type: String
  }
}, {
  timestamps: true
});

export const OffertModel = mongoose.model<IOffert>('Offert', offertModel);