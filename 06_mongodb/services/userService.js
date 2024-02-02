import User from "../models/userModels.js";

export const addUser = async (userData) => {
  const newUser = await User.create(userData);

  // const newUser = User(userData);
  // await newUser.save();

  // const { password, ...restUserData } = userData;
  // const newUser = await User.create({
  //   password: hashedPassword,
  //   ...restUserData,
  // });

  // const newUser = await User.create(userData);

  newUser.password = undefined;
  return newUser;
};

export const getAll = async () => {
  const users = await User.find();
  // const users = await User.find().select("+password");
  // const users = await User.find().select("-email");
  // const users = await User.find().select("name email");
  return users;
};

export const getUserById = async (id) => {
  const user = await User.findById(id);
  return user;
};

export const updateUserById = async (id, data) => {
  // const updatedUser = await User.findByIdAndUpdate(id, data);

  const user = await User.findById(id);

  Object.keys(data).forEach((key) => {
    user[key] = data[key];
  });

  const updatedUser = await user.save();

  return updatedUser;
};

export const hideUser = async (id) => {
  //
};

export const removeUser = async (id) => {
  await User.findByIdAndDelete(id);
};
