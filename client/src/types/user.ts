import { IGame } from './game';

export interface IUser {
    _id: string;
    email: string;
    username: string;
    gender: string;
    games: IGame[],
    createdAt: string;
    updatedAt: string;
    age: number;
    description: string;
};