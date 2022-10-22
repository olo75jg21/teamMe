import mongoose, { Schema, Document } from 'mongoose';

export interface IOffer extends Document {
  _user: any,
  game: string,
  description: string,
  rank: string,
};


const offerModel: Schema = new Schema({
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

export const OfferModel = mongoose.model<IOffer>('Offer', offerModel);