import { model, Schema } from "mongoose";
import userRoles from "../constants/userRoles.js";

const userScema = new Schema(
  {
    //   name: String,
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    year: Number,
    role: {
      type: String,
      enum: Object.values(userRoles),
      default: userRoles.USER,
    },
    // hidden: {
    //   type: Boolean,
    //   default: false,
    // },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const User = model("User", userScema);

export default User;
