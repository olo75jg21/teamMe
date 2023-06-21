import mongoose, { Schema, Document } from "mongoose";

export interface IGame {
  title?: string;
  rank?: string;
  position?: string;
}

export interface IInterests {
  game: string;
  minAge: number;
  maxAge: number;
  slots: number;
}

export interface IUser extends Document {
  email: string;
  password: string;
  role: string;
  username: string;
  gender: string;
  age: number;
  description: string;
  password: string;
  interests: IInterests[];
}

const UserSchema: Schema = new Schema(
  {
    age: {
      type: Number,
      required: true,
    },
    role: {
      type: String,
      default: "user",
      enum: ["admin", "user"],
    },
    description: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    games: {
      type: [
        {
          name: {
            type: String,
          },
          rank: {
            type: String,
          },
        },
      ],
    },
    password: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    gender: {
      type: String,
      required: true,
    },
    interests: [
      {
        game: {
          type: String,
          required: true,
        },
        minAge: {
          type: String,
          required: true,
        },
        maxAge: {
          type: String,
          required: true,
        },
        slots: {
          type: Number,
          required: true,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

export const UserModel = mongoose.model<IUser>("User", UserSchema);
