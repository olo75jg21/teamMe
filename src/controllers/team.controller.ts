import { Request, Response } from "express";
import { TeamModel } from "../models/team.model";
import { UserModel } from "../models/user.model";
import nodemailer from "nodemailer";
import { MAILTRAP_USERNAME, MAILTRAP_PASSWORD } from "../config/config";

export const handleAddTeam = async (req: Request, res: Response) => {
  try {
    const team = await TeamModel.create(req.body);

    const users = await UserModel.find();

    // Go through all users' interests
    for (let user of users) {
      for (let interest of user.interests) {
        // Check if team matches user's interest
        if (
          team.game === interest.game &&
          team.minAge >= interest.minAge &&
          team.maxAge <= interest.maxAge &&
          team.slots >= interest.slots
        ) {
          // Team matches the user's interest, send them an email
          const transporter = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
              user: MAILTRAP_USERNAME,
              pass: MAILTRAP_PASSWORD,
            },
          });

          const mailOptions = {
            from: "youremail@gmail.com", // Your email
            to: user.email,
            subject: "A new team you might be interested in was just created",
            text: `Team ${team.name} was just created and it matches your interests!`,
          };

          transporter.sendMail(mailOptions, function (err, info) {
            if (err) {
              console.log(err);
            } else {
              console.log("Email sent: " + info.response);
            }
          });
        }
      }
    }

    res.status(201).send(team);
  } catch (error) {
    res.status(500).send({ message: error });
  }
};

export const handleGetAllTeams = async (req: Request, res: Response) => {
  try {
    const {
      title,
      ageMin,
      ageMax,
      game,
      gender,
      userId,
      sortBy,
      order,
      page,
      limit,
    } = req.query;

    const query = TeamModel.find({ isActive: true });
    let countQuery = TeamModel.countDocuments({ isActive: true });

    if (title) {
      query.where("title", new RegExp(title.toString(), "i"));
      countQuery.where("title", new RegExp(title.toString(), "i"));
    }

    if (ageMin) {
      query.where("minAge").gte(parseInt(ageMin.toString()));
      countQuery.where("minAge").gte(parseInt(ageMin.toString()));
    }

    if (ageMax) {
      query.where("maxAge").lte(parseInt(ageMax.toString()));
      countQuery.where("maxAge").lte(parseInt(ageMax.toString()));
    }

    if (game) {
      query.where("game", game);
      countQuery.where("game", game);
    }

    if (gender) {
      query.where("gender", gender);
      countQuery.where("gender", gender);
    }

    if (userId) {
      const userIdCondition = {
        _user: { $ne: userId },
        "applicants._user": { $ne: userId },
      };

      query.where(userIdCondition);
      countQuery = countQuery.where(userIdCondition);
    }

    // Add sorting condition
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
