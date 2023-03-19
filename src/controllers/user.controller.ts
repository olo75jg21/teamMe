import { Request, Response } from 'express';
import * as _ from 'lodash';

import { UserModel } from '../models/user.model';

export const handleGetAllUsers = async (req: Request, res: Response) => {
  const users = await UserModel.find({});
  res.send(users);
};

export const handleGetOneUser = async (req: Request, res: Response) => {
  const user = await UserModel.findOne({ _id: req.params.id });
  res.send(_.omit(user?.toObject(), ['password']));
};