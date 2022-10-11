import { Request, Response } from 'express';
import { OffertModel } from '../models/offert.model';

export const handleAddOffert = async (req: Request, res: Response) => {
  const { _user } = req.body;

  const offert = await OffertModel.create({ _user });

  res.status(201).send(offert);
};