import { Request, Response } from "express";

import { UserModel } from "../models/user.model";
import { TeamModel } from "../models/team.model";
import { RefreshTokenModel } from "../models/refreshToken.model";

export const handleGetAllUsers = async (req: Request, res: Response) => {
  try {
    const { sortBy, order, page, limit } = req.query;

    const query = UserModel.find();
    let countQuery = UserModel.countDocuments();

    if (sortBy) {
      const sortOrder = order === "desc" ? -1 : 1;
      query.sort({ [sortBy.toString()]: sortOrder });
    }

    // Add pagination
    if (page && limit) {
      query.skip((parseInt(page.toString()) - 1) * parseInt(limit.toString()));
      query.limit(parseInt(limit.toString()));
    }

    const users = await query.exec();
    const totalUsers = await countQuery.exec();

    res.status(200).json({ data: users, total: totalUsers });
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
    const { sortBy, order, page, limit } = req.query;

    const query = TeamModel.find({ isActive: true });
    let countQuery = TeamModel.countDocuments({ isActive: true });

    if (sortBy) {
      const sortOrder = order === "desc" ? -1 : 1;
      query.sort({ [sortBy.toString()]: sortOrder });
    }

    // Add pagination
    if (page && limit) {
      query.skip((parseInt(page.toString()) - 1) * parseInt(limit.toString()));
      query.limit(parseInt(limit.toString()));
    }

    query.populate("_user");

    const teams = await query.exec();
    const totalTeams = await countQuery.exec();

    res.status(200).json({ data: teams, total: totalTeams });
  } catch (e) {
    res.status(404).send(e);
  }
};

export const handleGetPendingTeams = async (req: Request, res: Response) => {
  try {
    const { sortBy, order, page, limit } = req.query;

    const query = TeamModel.find({ isActive: false });
    let countQuery = TeamModel.countDocuments({ isActive: false });

    if (sortBy) {
      const sortOrder = order === "desc" ? -1 : 1;
      query.sort({ [sortBy.toString()]: sortOrder });
    }

    // Add pagination
    if (page && limit) {
      query.skip((parseInt(page.toString()) - 1) * parseInt(limit.toString()));
      query.limit(parseInt(limit.toString()));
    }

    query.populate("_user");

    const teams = await query.exec();
    const totalTeams = await countQuery.exec();

    res.status(200).json({ data: teams, total: totalTeams });
  } catch (e) {
    res.status(404).send(e);
  }
};
