import { IUser } from "./user";

export interface Applicant {
  _id: string;
  _user: IUser;
  status: string;
}

export interface ITeam {
  _id: string;
  _user: IUser;
  title: string;
  game: string;
  minRank: string;
  maxRank: string;
  applicants: Applicant[];
  description: string;
  name: string;
  teamType: string;
  slots: number;
  minAge: number;
  maxAge: number;
  isActive: true;
  createdAt: string;
}
