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

export const handleDeleteTeam = async (req: Request, res: Response) => {
  try {
    const teamId = req.params.id;
    const team = await TeamModel.findOneAndDelete({ _id: teamId });

    return res.status(200).json({ team });
  } catch (error) {
    res.status(404).send(error);
  }
};

export const handlePatchTeam = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { isActive, isVisible } = req.body; // receive new isActive and isVisible values from request body

  try {
    const team = await TeamModel.findById(id);
    if (!team) {
      return res.status(404).json({ message: "Team not found" });
    }

    if (typeof isActive !== "undefined") {
      team.isActive = isActive; // set isActive from request body if it's included
    }

    if (typeof isVisible !== "undefined") {
      team.isVisible = isVisible; // set isVisible from request body if it's included
    }

    await team.save();
    res.json(team);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
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

export const handleAcceptTeam = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const team = await TeamModel.findById(id);
    if (!team) {
      return res.status(404).json({ message: "Team not found" });
    }

    team.isActive = true;

    await team.save();
    res.json(team);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

export const handleRejectTeam = async (req: Request, res: Response) => {
  try {
    const teamId = req.params.id;
    const team = await TeamModel.findOneAndDelete({ _id: teamId });

    return res.status(200).json({ team });
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};
