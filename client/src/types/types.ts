export interface IUser {
    _id: string;
    age: number;
    createdAt: string;
    email: string;
    games: string[];
    gender: string;
    language: string[];
    username: string;
};

export interface RegisterFormValues {
    username: string;
    email: string;
    password: string;
    repeatPassword: string;
    age: number;
    gender: string;
};