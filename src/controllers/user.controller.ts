import { Request, Response } from "express";
import * as _ from "lodash";

import { UserModel } from "../models/user.model";

export const handleGetOneUser = async (req: Request, res: Response) => {
  const user = await UserModel.findOne({ _id: req.params.id });
  res.send(_.omit(user?.toObject(), ["password"]));
};

export const handleGetUserProfileData = async (req: Request, res: Response) => {
  try {
    const user = await UserModel.findOne({ _id: req.params.id });
    res.status(200).send(_.omit(user?.toObject(), ["password", "updatedAt"]));
  } catch (error) {
    res.status(404).send(error);
    console.error(error);
  }
};

export const handleUpdateUserProfile = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { username } = req.body;

  try {
    // Check if a user with the same username already exists
    const existingUser = await UserModel.findOne({ username });

    if (existingUser && existingUser._id.toString() !== id) {
      return res
        .status(400)
        .json({ error: "Username already exists. Cannot change data." });
    }

    // Find the user by ID and update the fields
    const updatedUser = await UserModel.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    return res.status(200).json(updatedUser);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Server error" });
  }
};
