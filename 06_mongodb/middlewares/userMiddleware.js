import { Types } from "mongoose";
import HttpError from "../utils/httpError.js";
import catchAsync from "../utils/catchAsync.js";
import {
  createUserDataValidator,
  updateUserDataValidator,
} from "../utils/userValidators.js";
import User from "../models/userModels.js";

export const checkCreateUserData = catchAsync(async (req, res, next) => {
  const { value, error } = createUserDataValidator(req.body);

  if (error) {
    throw new HttpError(400, "Invalid user data");
  }

  const userExists = await User.exists({ email: value.email });
  // console.log(userExists);

  if (userExists) {
    throw new HttpError(409, "User with this email already exists");
  }
  req.body = value;

  next();
});

export const checkUpdateUserData = (req, res, next) => {
  const { value, error } = updateUserDataValidator(req.body);

  if (error) {
    throw new HttpError(400, "Invalid user data");
  }

  req.body = value;
  next();
};

export const checkUserID = catchAsync(async (req, res, next) => {
  const { userID } = req.params;

  const isIdValid = Types.ObjectId.isValid(userID);
  if (!isIdValid) {
    throw new HttpError(404, "User is not found");
  }

  // const userExists = await User.exists({ _id: userID });
  const userExists = await User.findById(userID);
  if (!userExists) {
    throw new HttpError(404, "User is not found");
  }

  // req.user = userExists;
  next();
});
