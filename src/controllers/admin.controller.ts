import { Request, Response } from "express";

import { UserModel } from "../models/user.model";
import { TeamModel } from "../models/team.model";
import { RefreshTokenModel } from "../models/refreshToken.model";

export const handleGetAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await UserModel.find();
    res.status(200).send(users);
  } catch (e) {
    res.status(404).send(e);
  }
};

export const handleDeleteUser = async (req: Request, res: Response) => {
  try {
    const userId = req.params.id;
    const user = await UserModel.findOneAndDelete({ _id: userId });
    await RefreshTokenModel.findOneAndDelete({ _id: userId });

    await TeamModel.deleteMany({ _user: userId });

    await TeamModel.updateMany(
      { "applicants._user": userId },
      { $pull: { applicants: { _user: userId } } }
    );

    res.status(200).send(user);
  } catch (e) {
    res.status(404).send(e);
  }
};

export const handleGetAllTeams = async (req: Request, res: Response) => {
  try {
    const teams = await TeamModel.find({ isActive: true }).populate("_user");
    res.status(200).send(teams);
  } catch (e) {
    res.status(404).send(e);
  }
};

export const handleGetPendingTeams = async (req: Request, res: Response) => {
  try {
    const teams = await TeamModel.find({ isActive: false }).populate("_user");
    res.status(200).send(teams);
  } catch (e) {
    res.status(404).send(e);
  }
};
