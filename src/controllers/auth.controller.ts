import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import * as _ from 'lodash';

import { UserModel } from '../models/user.model';
import { generateAccessToken, generateRefreshToken } from '../utils/jwt.utils';

export const handleUserRegister = async (req: Request, res: Response) => {
  try {
    const { email, password, username, gender, age } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await UserModel.create({ email, username, gender, age, password: hashedPassword });
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
        const accessToken = generateAccessToken(user);
        const refreshToken = generateRefreshToken(user)
        const omitUser = _.omit(user.toObject(), ['password']);
        return res.status(200).send({ user: omitUser, token: accessToken, refreshToken });
      }

      return res.status(401).json({
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

export const handleTokenRefresh = async (req: Request, res: Response) => {
  try {
    // const { refreshToken } = req.body;
    // const refreshToken = generateRefreshToken('123123123');

    // return res.status(200).json({ refreshToken });

  } catch (error) {
    return res.status(401).json({ message: 'Invalid refresh token' });
  }
}