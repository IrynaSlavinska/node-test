import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import gravatar from "gravatar";
import path from "path";
import fs from "fs/promises";
import { nanoid } from "nanoid";

import { User } from "../models/userModel.js";
import HttpError from "../helpers/HttpError.js";
import catchAsync from "../helpers/catchAsync.js";
import { sendEmail } from "../helpers/sendEmail.js";

import dotenv from "dotenv";
dotenv.config();

const { SECRET_KEY, BASE_URL } = process.env;
const avatarsDir = path.resolve("public", "avatars");

export const registerCtrl = catchAsync(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user) {
    throw HttpError(409, "Email already in use");
  }

  const hashPassword = await bcrypt.hash(password, 10);
  const avatarURL = gravatar.url(email);
  const verificationToken = nanoid();

  const newUser = await User.create({
    ...req.body,
    password: hashPassword,
    avatarURL,
    verificationToken,
  });

  const verifyEmail = {
    to: email,
    subject: "Verify email",
    html: `<a target="_blanc" href="${BASE_URL}/api/auth/verify/${verificationToken}">Click verify email</a>`,
  };

  await sendEmail(verifyEmail);

  res.status(201).json({
    email: newUser.email,
    name: newUser.name,
  });
});

export const verifyEmailCtrl = catchAsync(async (req, res) => {
  const { verificationToken } = req.params;
  const user = await User.findOne({ verificationToken });

  if (!user) {
    throw HttpError(404, "User not found");
  }

  await User.findByIdAndUpdate(user._id, {
    verify: true,
    verificationToken: "",
  });

  res.json({ message: "Verification successful" });
});

export const resendVerifyEmailCtrl = catchAsync(async (req, res) => {
  const { email } = req.body;
  if (!email) {
    res.status(400).json({ message: "Missing required field email" });
  }
  const user = await User.findOne({ email });
  // if (!user) {
  //   throw HttpError(404, "User not found");
  // }
  if (user.verify) {
    throw HttpError(400, "Verification has already been passed");
  }

  const verifyEmail = {
    to: email,
    subject: "Verify email",
    html: `<a target="_blanc" href="${BASE_URL}/api/auth/verify/${user.verificationToken}">Click verify email</a>`,
  };
  await sendEmail(verifyEmail);

  res.json({
    message: "Verify email send success",
  });
});

export const loginCtrl = catchAsync(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw HttpError(401, "Email or password invalid");
  }
  if (!user.verify) {
    throw HttpError(401, "Email not verified");
  }

  const passwordCompare = await bcrypt.compare(password, user.password);
  if (!passwordCompare) {
    throw HttpError(401, "Email or password invalid");
  }

  const payload = {
    id: user._id,
  };

  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "23h" });
  await User.findByIdAndUpdate(user._id, { token });
  res.json({
    token,
  });
});

export const logoutCtrl = catchAsync(async (req, res) => {
  const { _id } = req.user;
  await User.findByIdAndUpdate(_id, { token: "" });

  res.status(200).json({
    message: "Logout success!",
  });
});

export const getCurrent = catchAsync(async (req, res) => {
  const { email, name } = req.user;

  res.json({
    email,
    name,
  });
});

export const updateAvatarCtrl = catchAsync(async (req, res) => {
  const { _id } = req.user;
  const { path: tempUpload, originalname } = req.file;
  // const resultUpload = path.resolve(avatarsDir, originalname);
  // await fs.rename(tempUpload, resultUpload);
  // const avatarURL = path.resolve("avatars", originalname);

  const filename = `${_id}_${originalname}`;
  const resultUpload = path.resolve(avatarsDir, filename);
  await fs.rename(tempUpload, resultUpload);
  const avatarURL = path.resolve("avatars", filename);
  await User.findByIdAndUpdate(_id, { avatarURL });

  res.status(200).json({
    avatarURL,
    ...req.body,
  });
});
