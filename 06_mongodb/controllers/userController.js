import catchAsync from "../utils/catchAsync.js";
import {
  addUser,
  getAll,
  getUserById,
  updateUserById,
} from "../services/userService.js";

const createUser = catchAsync(async (req, res) => {
  const newUser = await addUser(req.body);

  res.status(201).json(newUser);
});

const getUsersList = catchAsync(async (req, res) => {
  const users = await getAll();

  res.status(201).json(users);
});

const getOneUser = catchAsync(async (req, res) => {
  const user = await getUserById(req.params.userID);

  res.status(201).json(user);
});

const updateUser = catchAsync(async (req, res) => {
  const updatedUser = await updateUserById(req.params.userID, req.body);

  res.status(200).json(updatedUser);
});

const deleteUser = catchAsync(async (req, res) => {
  await hideUser(req.params.userID);

  res.sendStatus(204);
});

export default {
  createUser,
  getUsersList,
  getOneUser,
  updateUser,
  deleteUser,
};
