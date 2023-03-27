import mongoose, { Schema, Document, Types } from 'mongoose';

interface IApplicant {
  _user: Types.ObjectId;
  status: string;
}

export interface IOffer extends Document {
  _user: Types.ObjectId;
  game: string;
  description: string;
  rank: string;
  applicants: IApplicant[];
};

const OffertSchema: Schema = new Schema({
  _user: {
    type: Types.ObjectId,
    ref: 'User'
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
    deafult: null
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
        required: true,
        default: 'pending'
      }
    }]
  },
  slots: {
    type: Number,
    required: true
  },
  voiceCommunicators: {
    type: [String],
    required: true
  }
}, {
  timestamps: true
});

export const OfferModel = mongoose.model<IOffer>('Offer', OffertSchema);