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

export const handleGetUserProfileData = async (req: Request, res: Response) => {
  try {
    const user = await UserModel.findOne({ _id: req.query.id });
    res.status(200).send(_.omit(user?.toObject(), ['password', 'updatedAt']));
  } catch (error) {
    res.status(404).send(error);
    console.error(error);
  }
};

export const handleUpdateUserProfile = async (req: Request, res: Response) => {
  try {
    res.status(200).send({ status: 'ok' });
  } catch (error) {
    res.status(404).send(error);
  }
};