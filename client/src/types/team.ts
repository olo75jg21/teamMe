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
  applicants: Applicant[];
  description: string;
  rank: string;
  name: string;
  teamType: string;
  slots: number;
  minAge: number;
  maxAge: number;
  isActive: true;
  createdAt: string;
}
