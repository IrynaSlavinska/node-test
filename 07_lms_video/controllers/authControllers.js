import { User } from "../models/userModel.js";
import HttpError from "../helpers/HttpError.js";
import catchAsync from "../helpers/catchAsync.js";

export const registerCtrl = catchAsync(async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });

  if (user) {
    throw HttpError(409, "Email already in use");
  }

  const newUser = await User.create(req.body);

  res.status(201).json({
    email: newUser.email,
    name: newUser.name,
  });
});
