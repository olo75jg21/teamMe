import { IGame } from "./game";

export interface IUser {
  _id: string;
  email: string;
  username: string;
  gender: string;
  games: IGame[];
  age: number;
  role: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}
