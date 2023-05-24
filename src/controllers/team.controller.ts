import { Request, Response } from "express";
import { TeamModel } from "../models/team.model";

export const handleAddTeam = async (req: Request, res: Response) => {
  try {
    const team = await TeamModel.create(req.body);

    res.status(201).send(team);
  } catch (error) {
    res.status(500).send({ message: "Failed to create team" });
  }
};

export const handleGetAllTeams = async (req: Request, res: Response) => {
  try {
    const { title, ageMin, ageMax, game, gender, userId } = req.query;
    const query = TeamModel.find({ isActive: true });

    if (title) query.where("title", new RegExp(title.toString(), "i"));

    if (ageMin) query.where("minAge").gte(parseInt(ageMin.toString()));

    if (ageMax) query.where("maxAge").lte(parseInt(ageMax.toString()));

    if (game) query.where("game", game);

    if (gender) query.where("gender", gender);

    if (userId)
      query.where({
        _user: { $ne: userId },
        "applicants._user": { $ne: userId },
      });

    query.populate("_user");

    const teams = await query.exec();

    res.status(200).json(teams);
  } catch (error: any) {
    res.status(404).send(error);
  }
};

export const handleGetTeam = async (req: Request, res: Response) => {
  try {
    const teamId = req.params.id;

    const team = await TeamModel.findOne({ _id: teamId })
      .populate("_user")
      .populate("applicants._user")
      .populate("chat.sender");

    res.status(200).send(team);
  } catch (error) {
    res.status(404).send(error);
  }
};

export const handleApplyOnTeam = async (req: Request, res: Response) => {
  try {
    const teamId = req.body.teamId;

    const team = await TeamModel.findOneAndUpdate(
      {
        _id: teamId,
      },
      {
        $push: {
          applicants: {
            _user: req.body.userId,
            status: "pending",
          },
        },
      }
    );

    res.status(200).send(team);
  } catch (error) {
    res.status(404).send(error);
  }
};

export const handleGetAllUserTeams = async (req: Request, res: Response) => {
  try {
    const userId = req.query?.userId;

    const teams = await TeamModel.find({ _user: userId }).populate("_user");

    res.status(200).send(teams);
  } catch (error) {
    res.status(404).send(error);
  }
};

export const handleGetAllUserApplications = async (
  req: Request,
  res: Response
) => {
  try {
    const userId = req.query?.userId;

    const teams = await TeamModel.find({
      "applicants._user": userId,
    })
      .populate("_user")
      .populate("applicants._user");

    res.status(200).send(teams);
  } catch (error) {
    res.status(404).send(error);
  }
};

export const handleUpdateTeam = async (req: Request, res: Response) => {
  try {
    const teamId = req.params.id;
    // @TODO change to updatedTeam
    const { updatedTeam } = req.body;

    const team = await TeamModel.findByIdAndUpdate(teamId, updatedTeam, {
      new: true,
    });

    if (!team) {
      return res.status(404).json({ error: "Document not found" });
    }

    return res
      .status(200)
      .json({ message: "Document updated successfully", team });
  } catch (error) {
    res.status(404).send(error);
  }
};

export const handleDeleteTeam = async (req: Request, res: Response) => {
  try {
    const teamId = req.params.id;
    const team = await TeamModel.findByIdAndDelete(teamId);

    return res.status(200).json({ team });
  } catch (error) {
    res.status(404).send(error);
  }
};
