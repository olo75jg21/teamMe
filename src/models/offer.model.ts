import mongoose, { Schema, Document, Types } from 'mongoose';

export interface IOffer extends Document {
  _user: Types.ObjectId;
  game: string;
  description: string;
  rank: string;
  applicants: string[];
};

const offerModel: Schema = new Schema({
  _user: {
    type: Types.ObjectId,
    ref: 'User'
  },
  title: {
    type: String
  },
  game: {
    type: String
  },
  description: {
    type: String
  },
  rank: {
    type: String
  },
  applicants: {
    type: [String]
  }
}, {
  timestamps: true
});

export const OfferModel = mongoose.model<IOffer>('Offer', offerModel);