import { nanoid } from 'nanoid';
import fs from 'fs/promises';

import HttpError from '../utils/httpError.js';
import catchAsync from '../utils/catchAsync.js';
import createUserDataValidator from '../utils/userValidators.js';

const createUser = catchAsync(async (req, res) => {
  const { value, error } = createUserDataValidator(req.body);
  // console.log(value, error);

  if (error) {
    throw new HttpError(400, 'Invalid user data');
  }

  const { name, year } = value;
  const newUser = {
    id: nanoid(),
    name,
    year,
  };
  const usersDB = await fs.readFile('users.json');
  const users = JSON.parse(usersDB);
  users.push(newUser);
  await fs.writeFile('users.json', JSON.stringify(users, null, 2));
  res.status(201).json({
    message: 'Success!',
    user: newUser,
  });
});

const getUsersList = async (req, res, next) => {
  try {
    const usersDB = await fs.readFile('users.json');
    const users = JSON.parse(usersDB);
    res.status(201).json({
      message: 'Success!',
      users,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const getOneUser = (req, res) => {
  res.status(201).json({
    message: 'Success!',
    user: req.user,
    time: req.time,
  });
};

export default {
  createUser, getUsersList, getOneUser
};

// const updateUser = async (req, res) => {};
// const deleteUser = async (req, res) => {};

// app.patch("/users/:userID", async (req, res) => {});
// app.delete("/users/:userID", async (req, res) => {});
