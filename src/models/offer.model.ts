import mongoose, { Schema, Document, Types } from 'mongoose';

interface IApplicant {
  _user: Types.ObjectId;
  status: string;
}

export interface IOffer extends Document {
  _user: Types.ObjectId;
  isActive: boolean;
  offerType: string;
  title: string;
  game: string;
  description: string;
  rank: string;
  applicants: IApplicant[];
  slots: number;
};

const OffertSchema: Schema = new Schema({
  _user: {
    type: Types.ObjectId,
    ref: 'User'
  },
  isActive: {
    type: Boolean,
    default: true
  },
  offerType: {
    type: String,
    required: true,
    enum: ['solo', 'team'] // Solo means Im solo player and I am looking for a team/ team otherwise
  },
  title: {
    type: String,
    required: true
  },
  game: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  rank: {
    type: String,
    required: true
  },
  applicants: {
    type: [{
      _user: {
        type: Types.ObjectId,
        ref: 'User'
      },
      status: {
        type: String,
        enum: ['pending', 'rejected', 'accepted'],
        default: 'pending'
      }
    }],
    default: {}
  },
  slots: {
    type: Number,
    required: true
  }
}, {
  timestamps: true
});

export const OfferModel = mongoose.model<IOffer>('Offer', OffertSchema);