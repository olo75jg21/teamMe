import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { UserModel } from '../models/user.model';

export const handleUserRegister = async (req: Request, res: Response) => {
  try {
    const { email, username, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await UserModel.create({ email, username, password: hashedPassword });
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
        return res.status(200).send(user);
        // perform jwt operations
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