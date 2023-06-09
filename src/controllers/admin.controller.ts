import { Request, Response } from "express";

import { UserModel } from "../models/user.model";

export const handleGetAllUsers = async (req: Request, res: Response) => {
  const users = await UserModel.find();
  res.status(200).send(users);
};
