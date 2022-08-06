import { Request, Response } from 'express';
import bcrypt from 'bcrypt';

import { UserModel } from '../models/user.model';
import { signJwt } from '../utils/jwt.utils';

import { SERVER_TOKEN_EXPIRETIME } from '../config/config';

export const handleUserRegister = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await UserModel.create({ email, password: hashedPassword });
    res.status(201).send(user);
  } catch (e: any) {
    res.status(409).send(e.message);
  }
};

export const handleUserLogin = async (req: Request, res: Response) => {
  try {
    const { password, email } = req.body;
    const user = await UserModel.findOne({ email });
    if (user) {
      const comparePassword = await bcrypt.compare(password, user.password);

      if (comparePassword) {
        const jwt = signJwt(user);
        return res.status(200).send({ user, token: jwt });
      }

      return res.json({
        message: 'Wrong username or password.'
      });
    }

    return res.status(401).json({
      message: 'Wrong username or password.'
    });

  } catch (e) {
    console.log(e)
    return res.status(401).send(e);
  }
};

export const handleGetAllUsers = async (req: Request, res: Response) => {
  const users = await UserModel.find({});
  res.send(users);
};

export const handleGetOneUser = async (req: Request, res: Response) => {
  const user = await UserModel.findOne({ _id: req.params.id });
  res.send(user);
};