import { IUser } from './user';

export interface Applicant {
  _id: string;
  _user: IUser;
  status: string;
};

export interface IOffer {
  _id: string;
  _user: IUser;
  title: string;
  game: string;
  applicants: Applicant[];
  description: string;
  rank: string;
  offerType: string;
  slots: number;
  minAge: number;
  maxAge: number;
  isActive: true;
  createdAt: string;
};