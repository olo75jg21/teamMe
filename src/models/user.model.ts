import mongoose, { Schema, Document } from "mongoose";

export interface IGame {
  title?: string;
  rank?: string;
  position?: string;
}

export interface IUser extends Document {
  email: string;
  username: string;
  gender: string;
  games: IGame[];
  age: number;
  description: string;
  password: string;
}

const UserSchema: Schema = new Schema(
  {
    age: {
      type: Number,
      required: true,
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
      // validate: [validateGameCount, "{PATH} exceeds the limit of 3"],
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
  },
  {
    timestamps: true,
  }
);

// function validateGameCount(value: Array<any>) {
//   return value.length <= 3;
// }

export const UserModel = mongoose.model<IUser>("User", UserSchema);
