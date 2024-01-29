import catchAsync from "../utils/catchAsync.js";
import User from "../models/userModels.js";

const createUser = catchAsync(async (req, res) => {
  const newUser = await User.create(req.body);

  newUser.password = undefined;

  res.status(201).json({
    message: "Success!",
    user: newUser,
  });
});

const getUsersList = catchAsync(async (req, res, next) => {
  try {
    const users = await User.find();
    // const users = await User.find().select("+password");
    // const users = await User.find().select("-email");
    // const users = await User.find().select("name email");

    res.status(201).json({
      message: "Success!",
      users,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
});

const getOneUser = catchAsync(async (req, res) => {
  const user = await User.findById(req.params.userID);
  res.status(201).json({
    message: "Success!",
    user,
  });
});

const updateUser = catchAsync(async (req, res) => {
  const updatedUser = await User.findByIdAndUpdate(
    req.params.userID,
    req.body,
    {
      new: true,
    }
  );
  res.status(200).json({
    message: "Success!",
    user: updatedUser,
  });
});

const deleteUser = catchAsync(async (req, res) => {
  await User.findByIdAndDelete(req.params.userID);

  res.sendStatus(204);
});

export default {
  createUser,
  getUsersList,
  getOneUser,
  updateUser,
  deleteUser,
};

// const updateUser = async (req, res) => {};
// const deleteUser = async (req, res) => {};

// app.patch("/users/:userID", async (req, res) => {});
// app.delete("/users/:userID", async (req, res) => {});
