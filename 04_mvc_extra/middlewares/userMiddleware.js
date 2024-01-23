import fs from 'fs/promises';

import HttpError from '../utils/httpError.js';
import catchAsync from '../utils/catchAsync.js'

const checkUserID = catchAsync(async (req, res, next) => {
  const { userID } = req.params;
  // if (userID.length < 10) {
  //   res.status(400).json({ message: 'Failed (((' });
  //   return;
  // }

  if (userID.length < 10) {
    throw new HttpError(400, 'Bad id');
  }

  const usersDB = await fs.readFile('users.json');
  const users = JSON.parse(usersDB);
  const user = users.find((el) => el.id === req.params.userID);
  if (!user) {
    throw new HttpError(404, 'User is not found');
  }
  req.user = user;
  next();
});

export default checkUserID;
