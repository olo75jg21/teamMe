import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import * as _ from 'lodash';

import { UserModel } from '../models/user.model';
import { RefreshTokenModel } from '../models/refreshToken.model';
import { generateAccessToken, generateRefreshToken } from '../utils/jwt.utils';
import { SERVER_TOKEN_REFRESH_EXPIRETIME } from '../config/config';

export const handleUserRegister = async (req: Request, res: Response) => {
  try {
    const { email, password, username, gender, age } = req.body;

    const existingUser = await UserModel.findOne({ email });
    if (existingUser)
      return res.status(409).send({
        error: 'Email already in use'
      });

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
        const accessToken = generateAccessToken(user._id);

        // If there is token in RefreshTokenModel collection we want to delete it
        await RefreshTokenModel.findOneAndDelete({ _id: user._id });

        // Generate and save refresh token to db
        const refreshToken = generateRefreshToken(user._id)
        await RefreshTokenModel.create({
          _id: user._id,
          token: refreshToken,
          expiresAt: new Date(Date.now() + Number(SERVER_TOKEN_REFRESH_EXPIRETIME.slice(0, -1)) * 60 * 60 * 60 * 1000 * 1000)
        });

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
    const { refreshToken } = req.body;
    // Old refresh token
    const token = await RefreshTokenModel.findOne({ token: refreshToken });

    if (!token || token.expiresAt < new Date())
      return res.status(401).json({ message: 'Invalid refresh token' });

    const newAccessToken = generateAccessToken(token._id);
    const newRefreshToken = generateRefreshToken(token._id);

    await RefreshTokenModel.deleteOne({ token: refreshToken });
    await RefreshTokenModel.create({
      userId: token,
      token: newRefreshToken,
      // expiresAt: new Date(Date.now() + Number(SERVER_TOKEN_REFRESH_EXPIRETIME.slice(0, -1)) * 60 * 60 * 1000)
      expiresAt: new Date(Date.now() + Number(SERVER_TOKEN_REFRESH_EXPIRETIME.slice(0, -1)) * 60 * 60 * 60 * 1000 * 1000)
    });

    return res.status(200).json({ accessToken: newAccessToken, refreshToken: newRefreshToken });
  } catch (error) {
    return res.status(401).json({ message: 'Invalid refresh token' });
  }
};

export const handleLogout = async (req: Request, res: Response) => {
  try {
    const { userId } = req.body;

    await RefreshTokenModel.findOneAndDelete({ id: userId });

    return res.status(200).json({ message: 'Logout successful' })
  } catch (error) {
    return res.status(404).json({ message: 'Invalid data' });
  }
};