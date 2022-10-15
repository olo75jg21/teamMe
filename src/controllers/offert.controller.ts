import { Request, Response } from 'express';
import { OffertModel } from '../models/offert.model';
import { UserModel } from '../models/user.model';

export const handleAddOffert = async (req: Request, res: Response) => {
  // try {
  //   const { _user } = req.body;

  //   console.log('added');

  //   const offert = await OffertModel.create({ _user });

  //   res.status(201).send(offert);
  // } catch (error: any) {
  //   console.log(error);
  // }

  const users = await UserModel.find({});
  res.send(users);
};

export const handleGetAllOfferts = async (req: Request, res: Response) => {
  try {
    const offerts = await OffertModel.find({});

    res.status(201).send(offerts);
  } catch (error: any) {
    console.log(error);
  }
};