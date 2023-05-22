import mongoose, { Schema, Document, Types } from 'mongoose';

interface IApplicant {
  _user: Types.ObjectId;
  status: string;
}

export interface ITeam extends Document {
  _user: Types.ObjectId;
  isActive: boolean;
  teamType: string;
  title: string;
  game: string;
  minAge: number;
  maxAge: number;
  description: string;
  rank: string;
  applicants: IApplicant[];
  slots: number;
};

const TeamSchema: Schema = new Schema({
  _user: {
    type: Types.ObjectId,
    ref: 'User'
  },
  isActive: {
    type: Boolean,
    default: true
  },
  teamType: {
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
  minAge: {
    type: Number,
    default: 16,
  },
  maxAge: {
    type: Number,
    default: 100
  },
  // @TODO add rank range
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
      }
    }],
  },
  slots: {
    type: Number,
    required: true
  }
}, {
  timestamps: true
});

export const TeamModel = mongoose.model<ITeam>('Team', TeamSchema);